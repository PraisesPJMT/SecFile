/**
 * Renders a password icon as an SVG element.
 *
 * @return {JSX.Element} The password icon SVG element.
 */
const Password = () => {
  return (
    <svg width="800px" height="800px" viewBox="0 0 192 192" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 0h192v192H0z" fill="none" />
      <circle
        cx="96"
        cy="96"
        r="67"
        stroke="#000000"
        strokeWidth="12px"
        strokeMiterlimit="10"
        fill="none"
      />
      <path
        d="M106.84 103.05C112.93 99.37 117 92.69 117 85.06c0-11.6-9.4-21-21-21s-21 9.4-21 21c0 7.63 4.07 14.31 10.16 17.99L75 127.93h42l-10.16-24.88Z"
        strokeLinejoin="round"
        stroke="#000000"
        strokeWidth="12px"
        fill="none"
      />
      <path
        d="m22 22 26 26m96 96 26 26m-148 0 26-26m96-96 26-26"
        fill="none"
        strokeLinecap="round"
        strokeMiterlimit="10"
        stroke="#000000"
        strokeWidth="12px"
      />
    </svg>
  )
}

export default Password
