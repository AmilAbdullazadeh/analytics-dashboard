# Analytics Dashboard

A modern React analytics dashboard with advanced filtering, mapping, and data visualization capabilities.

## Features

- 📊 Real-time data filtering and visualization
- 🗺️ Interactive map integration with Leaflet
- 📱 Responsive design with Tailwind CSS
- 🎨 Modern UI components with Shadcn UI
- 🔍 Advanced search, sorting and filtering capabilities
- 📈 Status tracking and analytics
- 🔄 Redux state management
- 📋 Data export (CSV/JSON)
- ♿ WCAG 2.1 Compliant Accessibility
- 🔒 Secure authentication with JWT
- 🌐 Internationalization with react-i18next
- 🌓 Dark mode support
- 🧪 Testing with Jest and React Testing Library

### 2. Advanced Filtering
- Multi-criteria filtering system
- Saved filter presets
- Advanced search with field operators
- Date range filtering
- GPS code filtering
- Status-based filtering
- Value range filtering
- Search by name
- Sorting by status, name, value, date

### 3. Data Management
- Export functionality (CSV/JSON)
- Data grouping and aggregation

### 4. User Experience
- Keyboard shortcuts
  - Ctrl/Cmd + K: Focus search
  - Ctrl/Cmd + R: Reset filters
  - Ctrl/Cmd + A: Toggle bulk select
- Responsive layout
- Loading states
- Error handling

### 5. Map Features
- Custom marker clustering
- Multiple map layer options
- Interactive markers with user info
- Region-based filtering

### Accessibility Features

#### Table Components
- Proper ARIA labels and roles for interactive elements
- Screen reader announcements for sorting and pagination
- Semantic table markup with proper header scopes
- Keyboard navigation support
- ARIA live regions for dynamic content updates

#### Interactive Elements
- Decorative icons marked with aria-hidden
- Proper button and input labeling
- Focus management and visible focus indicators
- Clear action descriptions for assistive technology
- Empty state announcements

#### Navigation & Controls
- Toolbar and button group roles
- Pagination controls with proper ARIA labels
- Search input with clear labeling
- Export buttons with descriptive labels
- Status and error announcements

#### Keyboard Support
- Full keyboard navigation
- Focus trap in modals and dropdowns
- Skip links for main content
- Logical tab order
- Clear focus indicators

## Technical Implementation

### State Management
- Redux Toolkit for global state
- RTK Query for data fetching
- Memoized computations
- Filter presets persistence

### Components
- StatCards: Overview statistics
- StatusChart: Value distribution
- TimelineView: Recent activities
- FilterPresets: Saved filters
- BulkActions: Multi-item operations
- PrintView: Print-optimized layout
- ExportButton: Data export
- Map: Interactive map with markers
- FilterPanel: Filtering and sorting options
- SearchInput: Search functionality
- Select: Filtering by status
- DatePicker: Filtering by date
- Button: Export button
- Badge: Status badge
- Card: Filter panel
- CardHeader: Filter panel header
- CardContent: Filter panel content
- Label: Label for input fields
- Select: Filtering by status
- SelectTrigger: Trigger for select dropdown

### Data Types
```typescript
interface UserData {
  id: string;
  first_name: string;
  last_name: string;
  birth_year: number;
  gps_code: string;
  latitude: number;
  longitude: number;
  datetime: string;
  status: 'Qualified' | 'Lead' | 'Closed' | 'Lost' | 'Negotiation' | 'Proposal';
  value: number;
}
```

## ESLint and Prettier Configuration

The project uses ESLint and Prettier for code linting and formatting. The following configurations have been added:

### Available Scripts

The following npm scripts are available for linting and formatting:

```bash
# Run ESLint
yarn lint

# Fix ESLint issues
yarn lint:fix

# Format code using Prettier
yarn format

# Check code formatting
yarn format:check

# Fix formatting issues
yarn format:fix
```

### Code Style

The project enforces consistent code style through these tools:

- Single quotes for strings
- Semicolons required
- Trailing commas in objects and arrays
- 2 spaces for indentation
- Maximum line length of 80 characters
- No unused variables or imports
- TypeScript strict mode enabled

To maintain consistent code style across the project, make sure to:

1. Install the ESLint and Prettier extensions for your IDE
2. Enable "Format on Save" in your editor
3. Run linting and formatting scripts before committing changes

## Performance Optimizations
- Memoized calculations
- Debounced search
- Virtualized table
- Optimized map rendering
- Lazy-loaded components

### Core Performance Requirements

#### Optimizations Implemented
- Virtualized table rendering for large datasets
- Debounced search with 300ms delay
- Memoized filter computations
- Chunked data processing for exports
- Progressive loading for map markers
- Code splitting and lazy loading
- Asset optimization and caching
- Server-side pagination

#### Resource Usage
- Image optimization with WebP format
- Cached API responses
- Web Workers for heavy computations

### Keyboard Shortcuts

#### Global Navigation
- `Ctrl/Cmd + K`: Focus search
- `Ctrl/Cmd + R`: Reset all filters and sorting
- `Ctrl/Cmd + A`: Toggle bulk select

#### Table Operations
- `Alt + 1-9`: Sort by column number
- `Alt + →`: Next page
- `Alt + ←`: Previous page
- `Alt + S`: Open sort menu
- `Alt + F`: Open filter menu

#### Map Controls
- `Alt + M`: Focus map
- `Alt + L`: Toggle map layers
- `Alt + C`: Center map

#### Export Operations
- `Alt + E`: Export menu
- `Alt + J`: Export as JSON
- `Alt + C`: Export as CSV

## Error Handling
- Global error boundary
- Fallback UI components
- Type-safe operations
- Proper error messages

## Development

### Commit Convention

We use conventional commits for clear version control:

```
feat: Add new feature
fix: Fix a bug
docs: Update documentation
style: Code style changes
refactor: Code refactoring
test: Add or update tests
chore: Update build tasks, etc.
```

### Branch Strategy

- `main`: Production-ready code
- `develop`: Development branch
- `feature/*`: New features
- `fix/*`: Bug fixes
- `release/*`: Release preparation

## Testing

We use Jest and React Testing Library for testing. Run tests with:

```bash
# Run all tests
yarn test

# Run tests with coverage
yarn test:coverage

# Run tests in watch mode
yarn test:watch
```

## Dependencies
- React 19
- Redux Toolkit
- TanStack Table
- Leaflet
- Tailwind CSS
- Date-fns
- TypeScript
- Shadcn UI
- React Hook Form
- React Router
- React Query
- React Testing Library
- Jest
- ESLint
- Prettier
- Husky
- Commitizen

## Project Structure
```
src/
├── components/      # React components
├── store/          # Redux store and slices
├── types/          # TypeScript types
├── utils/          # Utility functions
├── hooks/          # Custom React hooks
├── styles/         # Global styles
└── tests/          # Test files
```

## Future Enhancements
- Real-time collaboration
- Data export scheduling
- Advanced visualizations
- Automated reports
- Mobile app version
- Offline support
- User activity tracking
- Custom dashboards
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Performance Optimizations

### Security Measures
- Secure cookie attributes (HTTPOnly, Secure, SameSite)
- Token expiration handling
- Role-based route protection
- Input validation with Zod
- Protected API endpoints
- Input sanitization
- HTML escaping
- File type validation
- Content Security Policy
- XSS protection
- CSRF protection
- DOMPurify for XSS prevention
- HTML entity encoding
- File type validation
- Size limit enforcement
- Input sanitization
- Safe HTML rendering
- Input validation with Zod

### SEO Optimizations
- Meta tags management
- Open Graph support
- Twitter Cards
- Canonical URLs
- Structured data
- Semantic HTML

### Performance Features
- Code splitting
- Lazy loading
- Resource hints
- Performance monitoring
- Debounced search
- Throttled scroll handlers
- Memoized calculations
- Progressive loading

### Authentication Flow
1. User attempts to access protected route
2. If not authenticated, redirected to login with saved destination
3. After successful login, redirected to original destination
4. Token stored in HTTP-only cookie with secure flags
5. Auto-logout when token expires

### Table Component Optimizations
- Proper HTML table structure with thead/tbody
- Optimized suspense boundaries
- Smart data preloading
- Type-safe callback functions
- Efficient date range filtering
- Sanitized user inputs
- Performance metrics tracking
- Memory leak prevention


## Internationalization

The application supports multiple languages through react-i18next:

- English (en)
- Azerbaijani (az)
- Russian (ru)

### Translation Structure
- Translations are stored in `public/locales/{lang}/common.json`
- Language detection from browser settings
- Persistent language selection
- Fallback to English for missing translations

### Adding New Languages
1. Create a new translation file in `public/locales/{lang}/common.json`
2. Add the language to the supported languages list in `src/i18n/index.ts`
3. Add the language to the language switcher in `src/components/LanguageSwitcher.tsx`

### Internationalization Features
- Multiple language support
- Automatic language detection
- Easy language switching
- Translation file loading on demand
- Type-safe translations
- Persistent language selection
- Fallback handling

## Test User Credentials

For testing purposes, you can use the following credentials:

Email: test@example.com
Password: test123456