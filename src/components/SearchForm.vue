<template>
	<form :id="name" :aria-hidden="closedAttr" action="." autocomplete="off">
		<div>
			<button id="close-search" :aria-controls="name" aria-hidden="true" :aria-expanded="openAttr" class="hide-for-large-up">
				<svg-icon class="close-icon" name="x" />
			</button>
			<svg-icon class="search-icon" name="magnify-glass" />
			<input
				type="search"
				id="search-box"
				placeholder="Search all loans"
				v-model="term"
				@focus="onFocus"
				:aria-owns="`${name}-results`">
			<input type="submit" class="hidden-submit">
		</div>
	</form>
</template>

<script>
import { mapActions } from 'vuex';

import SvgIcon from '@/components/SvgIcon';

export default {
	props: ['name', 'open'],
	components: { SvgIcon },
	data() {
		return {
			term: ''
		};
	},
	computed: {
		openAttr() {
			return this.open ? 'true' : 'false';
		},
		closedAttr() {
			return this.open ? 'false' : 'true';
		},
	},
	methods: {
		...mapActions({
			onFocus: 'getLoanSearchSuggestions'
		})
	},
	watch: {
		term(term) {
			this.$store.dispatch('enterLoanSearchTerm', term);
		}
	}
};
</script>

<style lang="scss">
</style>
