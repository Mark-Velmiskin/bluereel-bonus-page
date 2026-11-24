export const deposits = [
  { step: 1, chip: 'Sign up & make your 1st deposit', amount: '200% up to $300', extra: '+ 75 free spins', active: true },
  { step: 2, chip: '2nd deposit', amount: '150% up to $300', status: 'After 1st deposit' },
  { step: 3, chip: '3rd deposit', amount: '100% up to $400', status: 'After 2nd deposit' },
  { step: 4, chip: '4th deposit', amount: '50% up to $500', status: 'After 3rd deposit' },
]

export const days = [
  { day: 'D1', reward: '$6' },
  { day: 'D2', reward: '$2' },
  { day: 'D3', reward: '4 FS' },
  { day: 'D4', reward: '$4' },
  { day: 'D5', reward: '6 FS' },
  { day: 'D6', reward: '$8' },
  { day: 'D7', reward: '8 FS' },
]

export const wheelPrizes = ['Jackpot', 'Free spins', 'Cash prizes', 'Cashback']

export const faq = [
  {
    q: 'How do I get the first bonus?',
    a: 'Sign up and make your first deposit of $10 or more. The 200% bonus and 75 free spins are added automatically.',
  },
  {
    q: 'What does wagering x35 mean?',
    a: 'Before you can withdraw bonus money, you need to bet 35 times the bonus amount. Example: a $10 bonus needs $350 in bets.',
  },
  {
    q: 'Can I use all bonuses at once?',
    a: 'Yes. Welcome bonuses unlock one by one, and the Daily Bonus and Lucky Wheel work alongside them.',
  },
  {
    q: 'How does the daily streak work?',
    a: 'Log in every day to claim the next reward. Miss a day and the streak starts again from Day 1.',
  },
  {
    q: 'How are Lucky Wheel prizes chosen?',
    a: 'Every eligible spin awards one of the prizes shown on the wheel. Prize odds and full eligibility details are listed in the bonus terms.',
  },
]

export const VALID_PROMO = 'WELCOME50'
