# 🛒 বাজার দর (BazarDor)

প্রয়োজনীয় পণ্যের দৈনিক বাজারদর এক নজরে দেখার ওয়েব অ্যাপ। চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম-দুধ ও মসলার আজকের দাম, দামের পরিবর্তন এবং বাজারভিত্তিক বিস্তারিত তথ্য।

## Live Link

(ডিপ্লয়ের পর এখানে লিংক বসান)

## Technologies Used

- Next.js (App Router)
- TypeScript
- Tailwind CSS + DaisyUI
- BetterAuth (Email/Password + GitHub)
- MongoDB Atlas
- react-hot-toast

## Features

1. **মূল্য ticker:** পণ্যের নাম, দাম ও ▲/▼ পরিবর্তনসহ অনন্ত স্ক্রলিং স্ট্রিপ
2. **হোম পেজ:** আজ কোন পণ্যের দাম সবচেয়ে বেশি বেড়েছে/কমেছে (শীর্ষ ৬টি) এবং সব পণ্যের responsive গ্রিড
3. **ক্যাটাগরি পেজ:** ক্যাটাগরি অনুযায়ী পণ্য, দাম অনুযায়ী সর্ট (বাংলা সংখ্যা সঠিকভাবে সামলানো), skeleton loading ও empty state
4. **পণ্যের বিস্তারিত (Protected):** সর্বনিম্ন, সর্বোচ্চ ও গড় দাম এবং বাজারভিত্তিক দামের টেবিল
5. **Authentication:** Email/Password ও GitHub লগইন, toast নোটিফিকেশনসহ
6. **প্রোফাইল ও নাম আপডেট**
7. **কাস্টম 404 পেজ** এবং সব স্ক্রিনে responsive ডিজাইন

## Getting Started

```bash
npm install
npm run dev
```

`.env` ফাইলে প্রয়োজনীয় ভ্যারিয়েবল:

```
MONGODB_URI=
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=http://localhost:3000
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```