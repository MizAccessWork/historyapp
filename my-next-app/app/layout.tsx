// app/layout.js
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div style={{ display: 'flex' }}>
          {/* Side Menu */}
          <nav style={{ width: '250px', background: '#f0f0f0', padding: '20px', minHeight: '100vh' }}>
            <h2>History Interview</h2>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li><a href="/">Home</a></li>
              <li><a href="/questions">Questions</a></li>
              <li><a href="/practice">Practice</a></li>
            </ul>
          </nav>
          
          {/* Main Content */}
          <main style={{ flex: 1, padding: '20px' }}>
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}