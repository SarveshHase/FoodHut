import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

function PageNavigation({ title }) {
    return (
        <div className="text-4xl flex items-center gap-3 font-semibold py-3 mb-3 text-black">
            <Link to="/">Home /</Link>
            <span className='text-4xl text-yellow-500'>
                {title}
            </span>
        </div>
    )
}

PageNavigation.propTypes = {
    title: PropTypes.string.isRequired
}

export default PageNavigation