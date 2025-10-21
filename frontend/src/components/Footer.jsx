import React from 'react'

function Footer() {
  return (
    <footer className="footer sm:footer-horizontal items-center p-4" style={{backgroundColor: "#CBDCEB"}}>
    <aside className="grid-flow-col items-center">
        <p className='font-medium' style={{fontFamily:"Nunito"}}>© Copyright {new Date().getFullYear()} CQGame Pro</p>
    </aside>
    </footer>
  )
}

export default Footer