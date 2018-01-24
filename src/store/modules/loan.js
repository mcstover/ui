import _groupBy from 'lodash/groupBy';
import _map from 'lodash/map';
import _omit from 'lodash/omit';
import _take from 'lodash/take';
import Bloodhound from 'bloodhound-js';

import loanSearchSuggestionsQuery from '@/graphql/query/loanSearchSuggestions.graphql';
import * as types from '@/store/mutation-types';
import { startsWith } from '@/util/comparators';

export default apollo => {
	// Create an uninitialized Bloodhound instance
	const loanFilterSearchEngine = new Bloodhound({
		datumTokenizer: datum => {
			// Split the datum label by words, where words can include accented characters
			const label = datum && datum.label ? datum.label.toString() : '';
			return label ? label.split(/[^a-zA-ZÀ-Ÿ0-9]+/) : [];
		},
		queryTokenizer: Bloodhound.tokenizers.whitespace,
		identify: datum => `${datum.group}${datum.label}`.replace(/[^a-zA-Z]/g, ''),
		initialize: false,
	});

	// Promise that resolves once the loan filter search engine is ready
	let filterSearchReadyResolve;
	const filterSearchReady = new Promise(resolve => {
		filterSearchReadyResolve = resolve;
	}).then(() => loanFilterSearchEngine.initialize());

	return {
		state: {
			searchSuggestions: [],
			filteredSuggestions: [],
			searchTerm: '',
		},
		getters: {},
		actions: {
			// Fetch all the filter suggestions via apollo
			getLoanSearchSuggestions({ commit }) {
				return apollo.query({ query: loanSearchSuggestionsQuery })
					.then(result => {
						const suggestions = result.data.loanSearchSuggestions;

						// Initialize the Bloodhound instance with the fetched suggestions
						loanFilterSearchEngine.local = suggestions;
						loanFilterSearchEngine.initialize(true); // 'true' to force initialize
						filterSearchReadyResolve();

						// Save list of all suggestions to the store
						commit(types.RECEIVE_LOAN_SEARCH_SUGGESTIONS, { suggestions });
					});
			},
			enterLoanSearchTerm({ commit }, term) {
				// Only search if a term has been entered
				if (term.length > 0) {
					filterSearchReady.then(() => {
						loanFilterSearchEngine.search(term, results => {
							// Group the results by their group name
							const groups = _groupBy(results, 'group');

							// From the groups, build the sections of suggestions to display
							const sections = _map(groups, (groupResults, name) => {
								// Sort this group of results alphabetically, putting results
								// that start with thte search term first
								groupResults.sort(startsWith(term, 'label'));

								// Limit the displayed results to the first 5
								const limited = _take(groupResults, 5);

								// Remove the 'group' property from each result to save on some space
								const suggestions = _map(limited, result => _omit(result, 'group'));

								// Construct the section, using the group name and sorted results
								return { name, suggestions };
							});

							// Save the results to the store
							commit(types.UPDATE_LOAN_SEARCH_TERM, { term, suggestions: sections });
						});
					}).catch((...args) => console.error(args));
				} else {
					// No search term, so no suggestions.
					commit(types.UPDATE_LOAN_SEARCH_TERM, { term: '', suggestions: [] });
				}
			}
		},
		mutations: {
			[types.RECEIVE_LOAN_SEARCH_SUGGESTIONS](state, { suggestions }) {
				state.searchSuggestions = suggestions;
			},
			[types.UPDATE_LOAN_SEARCH_TERM](state, { term, suggestions }) {
				state.searchTerm = term;
				state.filteredSuggestions = suggestions;
			},
		},
	};
};
