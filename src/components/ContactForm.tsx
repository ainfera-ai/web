"use client";

import { useState } from "react";

const VERTICALS = [
  ["finance", "Finance"],
  ["crypto", "Crypto"],
  ["accounting-tax", "Accounting / tax"],
  ["cybersecurity", "Cybersecurity"],
  ["legal", "Legal"],
  ["insurance", "Insurance"],
  ["other", "Other"],
] as const;

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [vertical, setVertical] = useState("finance");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="form-confirmation" role="status">
        <span className="eyebrow">Inquiry received</span>
        <h3>Thank you. We will review the workload context.</h3>
        <p>A member of the Ainfera team will respond directly.</p>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={(event) => { event.preventDefault(); setSent(true); }}>
      <label>
        <span>Name</span>
        <input name="name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Full name" required />
      </label>
      <label>
        <span>Work email</span>
        <input
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@company.com"
          required
        />
      </label>
      <label>
        <span>Company</span>
        <input name="company" value={company} onChange={(event) => setCompany(event.target.value)} placeholder="Company" required />
      </label>
      <label>
        <span>Vertical</span>
        <select name="vertical" value={vertical} onChange={(event) => setVertical(event.target.value)}>
          {VERTICALS.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
        </select>
      </label>
      <label>
        <span>Message</span>
        <textarea
          name="message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          rows={6}
          placeholder="What must the agent complete, where will it run, and what result would count as proof?"
          required
        />
      </label>
      <div className="contact-form__footer">
        <p>By submitting, you agree that Ainfera may use this information to respond to your inquiry.</p>
        <button className="button button--primary" type="submit">Submit inquiry</button>
      </div>
    </form>
  );
}
