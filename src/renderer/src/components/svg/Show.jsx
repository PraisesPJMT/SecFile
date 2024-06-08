/**
 * Renders an SVG component of a show icon.
 *
 * @return {JSX.Element} The SVG component.
 */
const Show = () => {
  return (
    <svg width="800px" height="800px" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 0h48v48H0z" fill="none" />
      <g id="Shopicon">
        <circle cx="24" cy="24" r="4" />
        <path
          d="M24,38c12,0,20-14,20-14s-8-14-20-14S4,24,4,24S12,38,24,38z M24,16c4.418,0,8,3.582,8,8s-3.582,8-8,8s-8-3.582-8-8
		S19.582,16,24,16z"
        />
      </g>
    </svg>
  )
}

export default Show
