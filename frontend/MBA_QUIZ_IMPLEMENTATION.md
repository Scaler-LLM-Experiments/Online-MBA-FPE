# Business x AI MBA Quiz Implementation

## ✅ Completed

### 1. New Quiz Architecture
- **Screen 1**: Current Role/Background (1 question, 8 options)
- **Screen 2**: Work Experience + Career Goal (2 questions together)
- **Screens 3-5**: Role-specific deep-dive (2 questions per screen, 6 total)

### 2. Files Created
- `frontend/src/components/quiz/MBAQuizScreens.js` - Quiz configuration
- `frontend/src/components/quiz/MBAQuiz.js` - New quiz orchestrator
- Updated `frontend/src/components/QuizPage.js` - Now uses MBAQuiz

### 3. Roles Implemented (Fully)
- ✅ **Product Manager** (6 questions across 3 screens)
- ✅ **Finance/Business Analyst** (6 questions across 3 screens)
- ✅ **Sales/Growth/Revenue** (6 questions across 3 screens)
- ✅ **Marketing/Brand/Performance** (6 questions across 3 screens)
- ✅ **Operations/Supply Chain/Strategy** (6 questions across 3 screens)
- ✅ **Startup Founder/Entrepreneur** (6 questions across 3 screens)

### 4. Branding Updates
- Changed title from "Free Profile Evaluation" to "Business x AI MBA"
- Updated subtitle to "Readiness Assessment"
- Changed features to business-focused:
  - "Business + AI Skills Assessment"
  - "Personalized Career Roadmap"
  - "Role-Specific Insights"
  - "Peer Benchmarking"
- Final CTA changed to "Get My Assessment"

---

## 🚧 TODO: Decide on Remaining Roles

### 1. Student / Fresh Graduate
**Decision needed**: Should they:
- Get generic business questions?
- Skip deep-dive entirely?
- Get simplified versions of questions?

### 2. Other Business Role
**Decision needed**: Same as Student/Fresh Graduate

---

## 📝 Implementation Pattern (Copy-Paste Template)

```javascript
'role-key': [
  // Screen 1: Role Questions 1-2
  {
    id: 'role-screen-1',
    initialChatText: "Chatbot message here",
    questions: [
      {
        id: 'role-q1',
        question: 'Question text?',
        helperText: 'Helper text (optional)',
        options: [
          { value: 'option1', label: 'Option 1', icon: <Icon size={24} weight="duotone" /> },
          { value: 'option2', label: 'Option 2', icon: <Icon size={24} weight="duotone" /> },
          { value: 'option3', label: 'Option 3', icon: <Icon size={24} weight="duotone" /> },
          { value: 'option4', label: 'Option 4', icon: <Icon size={24} weight="duotone" /> }
        ]
      },
      {
        id: 'role-q2',
        question: 'Question text?',
        helperText: 'Helper text (optional)',
        options: [
          { value: 'option1', label: 'Option 1', icon: <Icon size={24} weight="duotone" /> },
          { value: 'option2', label: 'Option 2', icon: <Icon size={24} weight="duotone" /> },
          { value: 'option3', label: 'Option 3', icon: <Icon size={24} weight="duotone" /> },
          { value: 'option4', label: 'Option 4', icon: <Icon size={24} weight="duotone" /> }
        ]
      }
    ]
  },
  // Repeat for Screen 2 and Screen 3
]
```

---

## 🔄 Reverting to Tech Career Evaluation

To switch back to the original tech career evaluation:

1. In `frontend/src/components/QuizPage.js`:
   ```javascript
   // Uncomment this:
   import FinalModeQuiz from './quiz/FinalModeQuiz';

   // Comment out this:
   // import MBAQuiz from './quiz/MBAQuiz';

   // Change return statement to:
   return <FinalModeQuiz onProgressChange={onProgressChange} />;
   ```

2. Revert tracking attribution changes if needed

---

## 🎨 Available Icons (from phosphor-react)

Common icons already imported in MBAQuizScreens.js:
- `Briefcase`, `ChartBar`, `TrendUp`, `MegaphoneSimple`
- `Package`, `Lightbulb`, `GraduationCap`, `UserCircle`
- `Clock`, `Timer`, `Trophy`, `Target`
- `CurrencyInr`, `Rocket`, `ChartLineUp`, `Users`
- `Database`, `PresentationChart`, `ShoppingCart`, `Storefront`
- `Buildings`, `Code`, `CheckCircle`, `XCircle`
- `Path`, `Lightning`, `Brain`, `Gear`

More available at: https://phosphoricons.com/

---

## 🧪 Testing

The quiz should now:
1. Start directly with role selection (no tech/non-tech split)
2. Show Experience + Career Goal on screen 2
3. Dynamically load 6 role-specific questions based on selected role
4. Track progress correctly (total screens = 2 + 3 role-specific)

To test:
```bash
# If frontend is running in Docker
docker logs cpe-frontend

# Or access directly
http://localhost/career-profile-tool/
```

---

## 📌 Next Steps

1. **Add remaining role questions** to `MBAQuizScreens.js`
2. **Decide on Student/Other role behavior**
3. **Test each role's flow** end-to-end
4. **Update backend** to handle new question IDs if needed
5. **Update results page** with MBA-specific evaluation logic

---

## 📂 File Locations

- Quiz Config: `frontend/src/components/quiz/MBAQuizScreens.js`
- Quiz Orchestrator: `frontend/src/components/quiz/MBAQuiz.js`
- Entry Point: `frontend/src/components/QuizPage.js`
- Original (Tech): `frontend/src/components/quiz/FinalModeQuiz.js` (preserved)
