import IngredientList from './ingredientList'
import Instructions from './instructions'

const Recipe = ({name, ingredients, steps}) =>
    <section>
        <h1>{name}</h1>
        <IngredientList list={ingredients}/>
        <Instructions title='食品材料' steps={steps}/>
    </section>
export default Recipe