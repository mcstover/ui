<template>
	<div class="www-page">
		<the-header />
		<slot name="secondary"></slot>
		<main>
			<slot name="tertiary"></slot>
			<slot></slot>
		</main>
		<the-footer />
		<the-basket-bar />
	</div>
</template>

<script>
import TheHeader from './TheHeader';
import TheFooter from './TheFooter';
import TheBasketBar from './TheBasketBar';

export default {
	components: { TheHeader, TheFooter, TheBasketBar },
};
</script>

<style lang="scss">
@import 'settings';

.www-page {
	height: 100%;
	display: flex;
	flex-flow: column nowrap;

	main {
		flex-grow: 1;
	}
}
</style>
