import re
from typing import Tuple

CYBERSECURITY_KEYWORDS = [
    "cve", "cwe", "capec", "vulnerability", "weakness", "attack pattern",
    "exploit", "mitigation", "memory leak", "buffer overflow", "path traversal",
    "input validation", "zeroize", "rust", "log4j", "sudo", "rce", "ssrf",
    "dos", "denial of service", "flooding", "serialized data", "cryptoapi",
    "vwc-map", "v2w-bert", "roberta", "t5", "link prediction", "mitre", "nvd",
    "cvss", "security", "threat", "attack", "unreleased resource", "lifetime"
]

OUT_OF_SCOPE_QUESTIONS = [
    "what is python", "who is the president", "what is a good laptop",
    "weather", "recipe", "movie", "football", "cricket", "capital of",
    "tell me a joke", "how to make coffee", "best smartphone", "car", "travel"
]

class CybersecurityDomainClassifier:
    """
    Implements mandatory Domain Classifier (Section 2 & Section 22):
    Evaluates whether user prompt is within cybersecurity vulnerability-to-attack-pattern domain.
    If outside domain or unsupported, returns is_in_domain=False, trigger output:
    'Not related to this research topic.'
    """

    @staticmethod
    def classify(query: str) -> Tuple[bool, str]:
        q_clean = query.strip().lower()
        if not q_clean:
            return False, "Not related to this research topic."

        # Check explicit out of scope patterns
        for oos in OUT_OF_SCOPE_QUESTIONS:
            if oos in q_clean:
                return False, "Not related to this research topic."

        # Check CVE identifier format (e.g. CVE-2021-45706)
        if re.search(r"cve-\d{4}-\d+", q_clean):
            return True, "Valid CVE Identifier format."

        # Check CWE identifier format (e.g. CWE-401)
        if re.search(r"cwe-\d+", q_clean):
            return True, "Valid CWE Identifier format."

        # Check CAPEC identifier format (e.g. CAPEC-125)
        if re.search(r"capec-\d+", q_clean):
            return True, "Valid CAPEC Identifier format."

        # Check keyword matches
        matches = [kw for kw in CYBERSECURITY_KEYWORDS if kw in q_clean]
        if len(matches) > 0:
            return True, f"Cybersecurity domain confirmed (Matched terms: {', '.join(matches[:3])})."

        # If query is a general non-cyber question (like "What is Python?") -> OUT OF SCOPE
        return False, "Not related to this research topic."
