import Recipe from './recipe'

const Menu = ({recipes}) => (
    <article>
        <header>
            <h1>菜谱</h1>
        </header>
        <div className='recipes'>
            {recipes.map((item, i) =>
                <Recipe key={i} {...recipes}/>
            )}
        </div>
    </article>
)

export default Menu