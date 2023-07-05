import React from 'react'
import { Link } from 'react-router-dom'
export default function Footer() {
  return (
    <div>
      <footer className="bg-light text-center text-lg-start">
          <div className="text-center p-3" style={{"background-color":"rgba(0, 0, 0, 0.2)"}}> © 2023 GoFood</div>
      </footer>
    </div>
  )
}