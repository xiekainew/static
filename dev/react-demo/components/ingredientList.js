import Ingredient from './ingredient'

const IngredientList = ({list}) =>
    <ul className='ingredients'>
        {list.map((item, i) =>
            <Ingredient key={i} {...item}/>
        )}
    </ul>
export default IngredientList