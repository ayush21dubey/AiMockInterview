# Software Requirements Specification (SRS)

## AI Mock Interview Platform

**Version:** 1.0
**Project Duration:** 5 Days
**Team Size:** 3 Developers
**Budget:** ₹0
**Technology Stack:** MERN + Groq API

---

# 1. Introduction

## 1.1 Purpose

The purpose of this document is to define the functional and non-functional requirements for an AI-powered Mock Interview Platform that helps students and job seekers prepare for technical interviews through AI-generated questions, voice interaction, answer evaluation, and detailed performance reports.

The platform will simulate real interview scenarios by acting as an AI interviewer and providing personalized feedback.

---

## 1.2 Project Vision

To create a virtual AI interviewer capable of:

* Generating role-specific interview questions
* Conducting voice-based interviews
* Evaluating candidate responses
* Providing detailed feedback
* Tracking interview performance history
* Improving interview readiness

---

## 1.3 Scope

The platform will allow users to:

### Before Interview

* Create account
* Login
* Upload resume
* Select job role
* Select experience level

### During Interview

* Generate AI questions
* Voice-based interview
* Text-based interview
* AI interviewer interaction
* Progress tracking

### After Interview

* AI evaluation
* Score generation
* Improvement suggestions
* Performance dashboard
* Interview history

---

# 2. Product Overview

## 2.1 Target Users

### Students

Preparing for placements.

### Freshers

Preparing for first job interviews.

### Software Developers

Preparing for technical interviews.

### Career Switchers

Practicing domain-specific interviews.

---

## 2.2 User Goals

Users want to:

* Practice interviews anytime
* Receive unbiased feedback
* Identify weaknesses
* Improve communication skills
* Track improvement over time

---

# 3. System Architecture

```text
┌──────────────────────────┐
│       React Frontend      │
└────────────┬─────────────┘
             │
             ▼
┌──────────────────────────┐
│      Express Backend      │
└────────────┬─────────────┘
             │
     ┌───────┴────────┐
     ▼                ▼

┌────────────┐   ┌─────────────┐
│ MongoDB    │   │ Groq API    │
│ Atlas      │   │ LLM Engine  │
└────────────┘   └─────────────┘
```

---

# 4. User Roles

## Candidate

Can:

* Register
* Login
* Upload resume
* Take interviews
* View reports
* View history

---

## Administrator (Optional Future)

Can:

* Manage users
* View analytics
* Monitor platform activity

---

# 5. Functional Requirements

---

# Module 1: Authentication

## FR-1 Registration

User shall be able to create account using:

* Name
* Email
* Password

Validation:

* Unique email
* Password ≥ 8 characters

---

## FR-2 Login

User shall login using:

* Email
* Password

System shall generate JWT token.

---

## FR-3 Logout

User shall be able to logout.

---

# Module 2: Dashboard

## FR-4 Dashboard Overview

Dashboard shall display:

* Total Interviews
* Average Score
* Best Score
* Recent Interviews

---

## FR-5 Profile Management

User shall update:

* Name
* Skills
* Experience Level

---

# Module 3: Resume Upload

## FR-6 Upload Resume

Supported Formats:

* PDF

Maximum Size:

* 5 MB

---

## FR-7 Resume Analysis

System shall:

* Extract text
* Identify skills
* Identify technologies
* Identify projects

---

## FR-8 Resume-Based Questions

AI shall generate interview questions based on:

* Skills
* Projects
* Technologies

---

# Module 4: Interview Setup

## FR-9 Role Selection

User can select:

* MERN Developer
* Frontend Developer
* Backend Developer
* Java Developer
* Python Developer
* Data Analyst
* Data Scientist

---

## FR-10 Experience Level

User selects:

* Fresher
* 1–2 Years
* 3–5 Years
* 5+ Years

---

## FR-11 Interview Difficulty

User selects:

* Easy
* Medium
* Hard

---

# Module 5: AI Question Generation

## FR-12 Generate Questions

AI shall generate:

* Technical Questions
* Behavioral Questions
* Resume Questions

Question Count:

* 10 Questions

---

## FR-13 Dynamic Questioning

AI may ask follow-up questions based on answers.

Example:

```text
Question:
Explain useEffect.

User:
Basic explanation.

AI:
What happens if dependency array is omitted?
```

---

# Module 6: Voice Interview

## FR-14 AI Voice Output

System shall convert questions to speech.

Technology:

Browser Text-To-Speech API

---

## FR-15 Voice Input

System shall:

* Record microphone input
* Convert speech to text

Technology:

SpeechRecognition API

---

## FR-16 Live Transcription

User shall see real-time transcript.

---

# Module 7: Interview Session

## FR-17 Interview Progress

System shall display:

* Current Question
* Question Number
* Remaining Questions

---

## FR-18 Timer

Each question shall have timer:

Default:

```text
2 Minutes
```

Configurable.

---

## FR-19 Skip Question

User may skip a question.

---

# Module 8: AI Evaluation

## FR-20 Answer Analysis

AI shall evaluate:

* Accuracy
* Completeness
* Relevance
* Communication

---

## FR-21 Question Scoring

Each answer receives:

```text
0 - 10 Score
```

---

## FR-22 Feedback

AI shall provide:

* Strengths
* Weaknesses
* Suggested Improvement

Example:

```text
Strength:
Good understanding of React Hooks

Weakness:
Missing dependency array explanation

Suggestion:
Study useEffect lifecycle.
```

---

# Module 9: Final Report

## FR-23 Overall Score

System shall generate:

```text
Overall Score
```

---

## FR-24 Skill Assessment

System shall generate scores for:

* Technical Skills
* Communication
* Confidence
* Problem Solving

---

## FR-25 Performance Summary

System shall generate:

```text
Strength Areas
Improvement Areas
Learning Recommendations
```

---

# Module 10: Interview History

## FR-26 History Tracking

Store:

* Date
* Role
* Score
* Duration

---

## FR-27 Previous Reports

User shall access previous reports.

---

# Module 11: Analytics Dashboard

## FR-28 Progress Tracking

Charts:

* Score Trend
* Skill Trend
* Interview Count

---

## FR-29 Improvement Analysis

AI shall identify:

```text
Most Improved Skill
Weakest Skill
Recommended Focus Area
```

---

# 6. Database Design

## User Collection

```json
{
  "_id": "",
  "name": "",
  "email": "",
  "password": "",
  "experienceLevel": "",
  "createdAt": ""
}
```

---

## Resume Collection

```json
{
  "_id": "",
  "userId": "",
  "fileUrl": "",
  "extractedText": "",
  "skills": []
}
```

---

## Interview Collection

```json
{
  "_id": "",
  "userId": "",
  "role": "",
  "difficulty": "",
  "questions": [],
  "createdAt": ""
}
```

---

## Response Collection

```json
{
  "_id": "",
  "interviewId": "",
  "question": "",
  "answer": "",
  "score": "",
  "feedback": ""
}
```

---

## Report Collection

```json
{
  "_id": "",
  "interviewId": "",
  "overallScore": "",
  "technicalScore": "",
  "communicationScore": "",
  "problemSolvingScore": ""
}
```

---

# 7. API Requirements

## Authentication

```http
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
```

---

## Resume

```http
POST /api/resume/upload
GET /api/resume/:id
```

---

## Interview

```http
POST /api/interview/start
POST /api/interview/answer
POST /api/interview/finish
GET  /api/interview/history
```

---

## Reports

```http
GET /api/report/:id
GET /api/report/history
```

---

# 8. Non-Functional Requirements

## Performance

* API Response < 3 seconds
* Question Generation < 10 seconds
* Report Generation < 15 seconds

---

## Scalability

Support:

```text
100 Concurrent Users
```

---

## Security

* JWT Authentication
* Password Hashing (bcrypt)
* HTTPS
* Input Validation
* Rate Limiting

---

## Reliability

Availability:

```text
99%
```

---

# 9. Future Enhancements

### Video Interview

Webcam-based interviews.

### Emotion Detection

Facial expression analysis.

### Coding Round

Integrated coding editor.

### ATS Score

Resume ATS compatibility analysis.

### Multi-Language Interviews

Hindi
English
Spanish
French

### AI Career Coach

Personalized learning roadmap.

---

# 10. Success Criteria

The project will be considered successful if users can:

✅ Register/Login
✅ Upload Resume
✅ Generate AI Questions
✅ Complete Voice Interview
✅ Receive AI Evaluation
✅ View Final Report
✅ Track Interview History
✅ Access Analytics Dashboard

---

## Recommended MVP Deliverable (5 Days)

Focus on:

1. Authentication
2. Resume Upload
3. AI Question Generation
4. Voice + Text Interview
5. AI Evaluation
6. Final Report
7. Interview History

This gives you a portfolio-quality AI SaaS application that feels complete while remaining achievable within a 5-day hackathon-style timeline.
