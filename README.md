# FinTrack — Personal Finance Dashboard

A clean, responsive personal finance dashboard built with React and Vite. Track your income and expenses, visualize spending patterns, and gain smart insights into your financial health — all in a polished, dark/light-mode-ready UI.

---

## Features

### Dashboard
- **Balance Card** — Net balance with animated counter, savings rate badge, and income/expense split
- **Stat Cards** — At-a-glance summary of total income, total expenses, and transaction count
- **Balance Trend Chart** — Monthly income vs. expense area chart (Recharts)
- **Category Donut Chart** — Spending breakdown by category with interactive tooltips

### Transactions
- Full transaction table with sortable columns (date, amount, category, type)
- Filter by type (income/expense), category, and date range
- Add and edit transactions via modal forms with validation
- Empty state with contextual messaging

### Insights
- Monthly comparison card — current vs. previous month
- Top spending category highlight
- Transaction count trends
- Smart analysis panel surfacing financial patterns

### App-wide
- **Dark / Light mode** toggle with persisted preference
- **Multi-currency support** — USD and INR, switchable at runtime with compact formatting (e.g., `$12.4k` / `₹1.2L`)
- **Role-based access** — `admin` role can add/edit transactions; `viewer` role is read-only
- All preferences (theme, currency, role) persisted via `localStorage`
- Fully responsive layout with a collapsible sidebar

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 |
| Build Tool | Vite 8 |
| Routing | React Router DOM v7 |
| Charts | Recharts 3 |
| Icons | Lucide React |
| Styling | Tailwind CSS v4 |
| Linting | ESLint 9 |

---

## Project Structure

```
src/
├── components/
│   ├── dashboard/       # BalanceCard, StatCard, charts
│   ├── insights/        # Monthly comparison, top category, transaction count
│   ├── layout/          # AppShell, Sidebar, TopBar, PageWrapper
│   ├── modals/          # AddTransactionModal, EditTransactionModal, TransactionForm
│   ├── transactions/    # TransactionsTable, TransactionRow, filters, sorting
│   └── ui/              # Button, Badge, Spinner, AnimatedCounter, DarkModeToggle, RoleSwitcher
├── context/
│   ├── AppProviders.jsx    # Composes all context providers
│   ├── CurrencyContext.jsx # Currency selection & formatting helpers
│   ├── FilterContext.jsx   # Transaction filter state
│   ├── RoleContext.jsx     # Admin / viewer role
│   ├── ThemeContext.jsx    # Dark / light mode
│   └── TransactionContext.jsx
├── data/
│   ├── categories.js       # Category definitions (slug, label, icon, color, type)
│   ├── chartTheme.js       # Recharts theme tokens
│   └── mockTransactions.js # Seed data
├── hooks/
│   ├── useAnimatedCounter.js
│   ├── useGreeting.js
│   ├── useInsights.js
│   └── useLocalStorage.js
├── pages/
│   ├── DashboardPage.jsx
│   ├── InsightsPage.jsx
│   └── TransactionsPage.jsx
└── utils/
    ├── categoryHelpers.js
    ├── formatCurrency.js   # format, formatAmount, formatCompact
    ├── formatDate.js
    ├── transactionHelpers.js
    └── validators.js
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+ (or pnpm / yarn)

### Installation

```bash
git clone https://github.com/your-username/fintrack.git
cd fintrack
npm install
```

### Development

```bash
npm run dev
```

Opens at `http://localhost:5173` with hot module replacement.

### Build

```bash
npm run build
```

Output goes to `dist/`. Preview the production build with:

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

---

## Categories

| Type | Categories |
|---|---|
| Income | Salary, Freelance, Investment |
| Expense | Food, Transport, Housing, Software, Health, Education, Other |

---

## Roles

| Role | Permissions |
|---|---|
| `viewer` | View dashboard, transactions, and insights (default) |
| `admin` | All viewer permissions + add and edit transactions |

Switch roles from the top bar using the **Role Switcher** control. The selection is saved to `localStorage`.

---

## Currency Support

Switch between **USD** and **INR** at any time from the top bar. All amounts re-format instantly:

- Standard: `$1,234.56` / `₹1,234.56`
- Compact: `$1.2k` / `₹1.2L`

---

## License

MIT
