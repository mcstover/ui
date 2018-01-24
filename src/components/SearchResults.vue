<template>
	<ol class="search-results" :id="`${ownedBy}-results`">
		<li v-for="section in sections" class="section">
			<h2>{{section.name}}</h2>
			<ol class="section-results">
				<li v-for="suggestion in section.suggestions" class="result">
					{{suggestion.label}}
				</li>
			</ol>
		</li>
	</ol>
</template>

<script>
import { mapState } from 'vuex';

export default {
	props: ['ownedBy'],
	computed: {
		...mapState({
			sections: state => state.loan.filteredSuggestions,
		}),
	}
};
</script>

<style lang="scss">
@import 'settings';

.search-results {
	$spacing: 0.4rem;

	background-color: $white;
	border: rem-calc(1) solid $iron;
	padding: $spacing;
	font-size: rem-calc(16);
	// z-index: 1100 !important; // override style set by js

	@media #{$large-up} {
		font-size: rem-calc(14);
	}

	&, ol {
		list-style: none;
		margin: none;
	}

	.result {
		cursor: pointer;
		padding: $spacing $spacing $spacing 1rem;
		line-height: 1.2;

		&:hover {
			color: $white;
			background-color: $kiva-accent-blue;
		}
	}

	.result:first-of-type {
		border-top: 1px solid #ccc;
		margin-top: 0.2rem;
		padding-top: 0.4rem;
	}

	.tt-cursor {
		color: $white;
		background-color: $kiva-accent-blue;
	}

	.tt-highlight {
		text-decoration: underline;
	}
}
</style>
