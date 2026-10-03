# VWC-MAP: Vulnerability → Weakness → Attack Pattern Intelligence Engine

> **Scientific Grounding:** Built strictly on the research paper:  
> *"Towards Automatic Mapping of Vulnerabilities to Attack Patterns using Large Language Models"*  
> **Authors:** Siddhartha Shankar Das, Ashutosh Dutta, Sumit Purohit, Edoardo Serra, Mahantesh Halappanavar, Alex Pothen  
> **Conference:** 2022 IEEE International Symposium on Technologies for Homeland Security (HST)  
> **DOI:** [10.1109/HST56032.2022.10025459](https://doi.org/10.1109/HST56032.2022.10025459)

---

## 1. Project Overview

**VWC-MAP** (Vulnerabilities-Weakness-Common Attack Pattern Mapping) is a specialized cybersecurity research assistant and intelligence application designed to automatically map real-world vulnerability descriptions (**CVEs**) to attack techniques (**CAPECs**) via weakness abstractions (**CWEs**).

Unlike generic AI chatbots, VWC-MAP enforces strict domain restrictions and explainable, knowledge-grounded NLP pipelines to prevent hallucination.

---

## 2. Research Paper Summary

Enterprise cyber-risk management requires identifying potential attack techniques capable of exploiting newly discovered vulnerabilities. However, published associations across repositories like NVD, MITRE CWE, and MITRE CAPEC are incomplete and manually generated.

VWC-MAP bridges this gap using a **two-tiered NLP classification framework**:
1. **Tier 1 (CVE → CWE):** Uses a Siamese transformer model (RoBERTa-Large / V2W-BERT) achieving **87% accuracy** in predicting CWE weakness categories.
2. **Tier 2 (CWE → CAPEC):** Uses two novel methods — **Link Prediction** (using feature subtraction `x-y` and multiplication `x*y` concatenation) and **Google T5 Text-to-Text** sequence generation (using multi-command tokens like `One Weakness to Attack:`).

---

## 3. System Architecture

```
┌────────────────────────────────────────────────────────┐
│               CVE / Vulnerability Input                │
│    (e.g., CVE-2021-45706 or Rust memory leak text)     │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│           Cybersecurity Domain Classifier              │
│ (Enforces Out-of-Scope: "Not related to research topic")│
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│              Tier 1: CVE → CWE Model                   │
│         (RoBERTa-Large V2W-BERT Siamese Encoder)       │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│            Intermediate CWE Predictions                │
│        (Root: CWE-404, Child: CWE-772, Leaf: CWE-401)  │
└───────────────────────────┬────────────────────────────┘
                            │
         ┌──────────────────┴──────────────────┐
         ▼                                     ▼
┌─────────────────┐                   ┌──────────────────┐
│ Link Prediction │                   │ T5 Text-to-Text  │
│  ((x-y)|x*y)    │                   │ Multi-Commands   │
└────────┬────────┘                   └────────┬─────────┘
         │                                     │
         └──────────────────┬──────────────────┘
                            ▼
┌────────────────────────────────────────────────────────┐
│           Tier 2: CAPEC Attack Patterns                │
│ (CAPEC-125, CAPEC-130, CAPEC-229, CAPEC-230, etc.)     │
└────────────────────────────────────────────────────────┘
```

---

## 4. Features & Views

- 📊 **Dashboard:** Key metrics (~170K CVEs, 924 CWEs, 546 CAPECs, 1,152 Ground Truth links) & architecture preview.
- 🔍 **Vulnerability Mapping (Query Interface):** Execution pipeline progress (`✓ Reading vulnerability` → `✓ Encoding description` → `✓ Predicting weaknesses` → `● Mapping to attack patterns`), Tier 1 & Tier 2 results, confidence meters, and expandable explainability ("Why was this predicted?").
- 🕸️ **Knowledge Graph:** Interactive SVG network graph displaying multi-level edges (`maps_to`, `ChildOf`, `CanPrecede`, `PeerOf`, `CanAlsoBe`, `Requires`).
- 🛡️ **CWE Explorer:** Searchable 924 CWE directory featuring all 13 paper fields (Name, Description, Extended Description, Mitigations, Background, Alternate Terms, Modes of Introduction, Consequences, Detection, Examples, Resources, Taxonomy, Notes).
- ⚔️ **CAPEC Explorer:** Searchable 546 CAPEC directory featuring all 12 paper fields (Execution Flow, Prerequisites, Mitigations, Indicators, Skills, Consequences).
- 📜 **CVE Explorer:** Searchable NVD database with CVSS scores and predicted attack vectors.
- 🧪 **Research Paper Demo:** Interactive runner featuring paper motivating examples (CVE-2021-45706 Rust zeroize crate, CWE-20, CWE-22, CWE-131) with a side-by-side **Comparison View** ("Published Paper Result" vs "Our Model Prediction").
- 📈 **Evaluation Dashboard:** Published paper accuracy metrics (RoBERTa-Large 87%), hierarchy levels `(1,1,1)` vs `(3,2,1)` vs `(5,2,2)`, GPU DDP scaling plots, and model comparison table.
- 🏗️ **Architecture Page:** Interactive blueprint with hover tooltips explaining Siamese encoders and T5 generation commands.
- 📚 **Research Paper Page:** Complete authors, DOI, citation details, and abstract.

---

## 5. Domain Restriction & Guardrails

To prevent general chatbot behavior:
- Any prompt outside the cybersecurity vulnerability-to-attack domain (e.g., *"What is Python?"*, *"Who is president of India?"*, *"What is a good laptop?"*) triggers the exact out-of-scope response:
  > **`Not related to this research topic.`**

---

## 6. Development & Setup

### Prerequisites
- Python 3.10+
- Node.js v18+ & npm

### Backend Installation & Run
```bash
# Navigate to repository root
cd /Users/sriramreddy/Desktop/LSR

# Install backend dependencies
python3 -m pip install fastapi uvicorn scikit-learn torch numpy

# Start FastAPI backend
python3 -m uvicorn backend.main:app --host 127.0.0.1 --port 8000
```

### Frontend Installation & Run
```bash
# Navigate to frontend directory
cd /Users/sriramreddy/Desktop/LSR/frontend

# Install frontend dependencies
npm install

# Build static bundle or launch dev server
npm run build
npx vite --port 3000
```

Access the application at: **`http://localhost:3000`** or **`http://127.0.0.1:8000`**

---

## 7. Limitations & Research Honesty

- **Model Checkpoints:** While the paper trained full RoBERTa-Large and Google T5 checkpoints on multi-GPU DDP clusters, our application provides a modular implementation inspired by the VWC-MAP research methodology.
- **Labeling:** The UI strictly distinguishes **Published Paper Results** (exact paper benchmarks) from **Our Model Predictions** (live inferences generated by our local pipeline).

---

## 8. Future Improvements

- Support live fine-tuning on newly published NVD CVE feeds.
- Integrate graph neural networks (GNNs) for multi-hop attack path reasoning.
- Support automated STIX/TAXII threat intelligence exports.
# cyber
