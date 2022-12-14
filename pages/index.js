import { createClient } from 'contentful';
import RecipeCard from '../components/RecipeCard.js';

export async function getStaticProps() {
	const client = createClient({
		space: process.env.CONTENTFUL_SPACE_ID,
		accessToken: process.env.CONTENTFUL_ACCESS_KEY,
	});

	const res = await client.getEntries({ content_type: 'recipe' });

	return {
		props: {
			recipes: res.items,
		},
	};
}

export default function Recipes({ recipes }) {
	console.log(recipes);
	return (
		<div className='recipe-list'>
			{recipes.map((recipe) => (
				<RecipeCard recipe={recipe} key={recipe.sys.id} />
			))}

			<style jsx>
				{`
					.recipe-list {
						display: grid;
						grid-template-columns: 1fr 1fr;
						grid-gap: 20px;
					}
				`}
			</style>
		</div>
	);
}
