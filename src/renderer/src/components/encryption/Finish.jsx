import Tick from '../svg/Tick'

/**
 * Renders the Finish component.
 *
 * @return {JSX.Element} The rendered Finish component.
 */
const Finish = () => {
  return (
    <>
      <div className="encrypt-header">
        <h6>Finish</h6>
      </div>
      <div className="encrypt-body">
        <div htmlFor="enc-finish" className="enc-finish">
          <Tick />
        </div>
      </div>
    </>
  )
}

export default Finish
