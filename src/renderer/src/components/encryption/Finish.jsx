import Tick from '../svg/Tick'
import PropTypes from 'prop-types'

/**
 * Renders the Finish component.
 *
 * @param {Object} props - The component props.
 * @return {JSX.Element} The rendered Finish component.
 */
const Finish = ({ title }) => {
  return (
    <>
      <div className="encrypt-header">
        <h6>{title}</h6>
      </div>
      <div className="encrypt-body">
        <div htmlFor="enc-finish" className="enc-finish">
          <Tick />
        </div>
      </div>
    </>
  )
}

Finish.propTypes = {
  title: PropTypes.string.isRequired
}

export default Finish
