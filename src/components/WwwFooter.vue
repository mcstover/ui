<template>
	<footer class="www-footer">
		<nav class="small-footer hide-for-large-up">
			<ul>
				<li><router-link to="">Borrow</router-link></li>
				<li><router-link to="">About</router-link></li>
				<li><router-link to="">Help</router-link></li>
				<li><router-link to="">Careers</router-link></li>
				<li><router-link to="">Site map</router-link></li>
			</ul>
			<div>
				<router-link to="">Privacy policy</router-link> | <router-link to="">Terms of use</router-link>
			</div>
			<p>
				Lending through Kiva involves risk of principal loss. Kiva does not guarantee repayment or offer a financial return on your loan.
				<br/><br/>
				&copy; {{year}} Kiva. All rights reserved.
			</p>
		</nav>
		<nav class="large-footer row show-for-large-up">
			<div class="groups">
				<div class="small-3 columns">
					<h1>Borrow</h1>
					<p>Loans for entrepreneurs doing amazing things.</p>
					<ul>
						<li><router-link to="">Apply now</router-link></li>
					</ul>
				</div>
				<div class="small-3 columns">
					<h1>Explore</h1>
					<ul>
						<li><router-link to="">Gifts</router-link></li>
						<li><router-link to="">Happening now</router-link></li>
						<li><router-link to="">Site map</router-link></li>
						<li><router-link to="">Developer API</router-link></li>
						<li><router-link to="">Privacy policy</router-link></li>
						<li><router-link to="">Terms of use</router-link></li>
					</ul>
				</div>
				<div class="small-3 columns">
					<h1>Get to know us</h1>
					<ul>
						<li><router-link to="">About us</router-link></li>
						<li><router-link to="">How Kiva works</router-link></li>
						<li><router-link to="">FAQs</router-link></li>
						<li><router-link to="">Where Kiva works</router-link></li>
						<li><router-link to="">Blog</router-link></li>
						<li><router-link to="">Partner with us</router-link></li>
						<li><router-link to="">Contact us</router-link></li>
						<li><router-link to="">Help</router-link></li>
					</ul>
				</div>
				<div class="small-3 columns">
					<h1>Community</h1>
					<ul>
						<li><router-link to="">Teams</router-link></li>
						<li><router-link to="">Students and educators</router-link></li>
					</ul>
				</div>
				<div class="small-6 columns">
					<p>
						Kiva is a 501(c)3 U.S. nonprofit fueled by passionate people. Founded in 2005, and based in San Francisco, with offices in Nairobi and staff around the globe.
						<router-link to="">Donate to our operating expenses.</router-link>
					</p>
				</div>
				<div class="work-with-us small-6 columns">
					<h1>Work with us</h1>
					<ul>
						<li><router-link to="">Careers</router-link></li>
						<li><router-link to="">Volunteer internships</router-link></li>
						<li><router-link to="">Kiva fellows</router-link></li>
						<li><router-link to="">Review and translation</router-link></li>
						<li><router-link to="">Trustees</router-link></li>
					</ul>
				</div>
				<div class="small-6 columns">
					<p>
						Lending through Kiva involves risk of principal loss. Kiva does not guarantee repayment or offer a financial return on your loan.
						<br/><br/>
						&copy; {{year}} Kiva. All rights reserved.
					</p>
				</div>
			</div>
		</nav>
	</footer>
</template>

<script>
import { getYear } from 'date-fns';

export default {
	data() {
		return {
			year: getYear(new Date()),
		};
	},
};
</script>

<style lang="scss">
@import 'settings';

$footer-link-separator-color: $light-green;

.www-footer {
	background-color: $kiva-green;
	color: $white;
	font-size: $small-font-size;
	line-height: $small-line-height;
	text-align: center;
	padding: 1.5rem 1rem;

	@media #{$medium-up} {
		padding: rem-calc(40);
	}

	@media #{$large-up} {
		padding: rem-calc(40) 1rem;
	}

	ul {
		list-style: none;
		margin: 0;
	}

	p {
		margin-bottom: 0;
		font-size: $small-font-size;
		line-height: $small-line-height;
		font-weight: normal;
	}

	a {
		color: $dark-green;
		font-size: $small-font-size;
		line-height: $small-line-height;

		&:visited,
		&:active {
			color: $dark-green;
		}
	}

	h1 {
		color: $white;
		font-size: $small-font-size;
		font-weight: bold;
		line-height: $small-line-height;
		margin: 0;
	}

	.small-footer {
		ul {
			display: flex;
			justify-content: space-between;
			margin: 0 0 1rem;
			border-bottom: 1px solid $footer-link-separator-color;

			li {
				margin: 0 0 1rem;
			}

			a {
				@media #{$medium-only} {
					font-size: $body-font-size;
					line-height: $body-line-height;
				}
			}
		}

		div {
			margin-bottom: 2rem;
			color: $footer-link-separator-color;

			a {
				margin: 0 0.75rem;
			}
		}
	}

	.groups {
		display: flex;
		flex-flow: column wrap;
		justify-content: space-between;
		height: rem-calc(360);
		text-align: left;

		a {
			line-height: 2;
		}

		p a {
			line-height: $small-line-height;
		}
	}

	.work-with-us {
		$spacing: 0.5rem;

		a {
			padding-left: $spacing;
			border-left: 1px solid $footer-link-separator-color;
			margin-left: $spacing;
			white-space: nowrap;
		}

		ul {
			overflow: hidden;
			width: calc(100% + #{$spacing * 2} + 1px);
		}

		li {
			display: inline-block;
			float: left;
			transform: translate3d(calc(-#{$spacing * 2} - 1px), 0, 0);
		}
	}
}
</style>
