import re
from typing import Dict, List, Optional, Any
from backend.data_store import CVE_DATABASE, CWE_DATABASE, CAPEC_DATABASE, CWE_CAPEC_GROUND_TRUTH

class NVDProvider:
    """NVD Provider isolates National Vulnerability Database access."""
    def get_cve(self, cve_id: str) -> Optional[Dict[str, Any]]:
        cve_id_clean = cve_id.strip().upper()
        return CVE_DATABASE.get(cve_id_clean)

    def search_cves(self, query: str) -> List[Dict[str, Any]]:
        query_lower = query.lower()
        results = []
        for cve_id, data in CVE_DATABASE.items():
            if (query_lower in cve_id.lower() or 
                query_lower in data["description"].lower() or 
                query_lower in data.get("affected_technology", "").lower()):
                results.append(data)
        return results

class CWEProvider:
    """CWE Provider isolates MITRE Common Weakness Enumeration dataset."""
    def get_cwe(self, cwe_id: str) -> Optional[Dict[str, Any]]:
        cwe_clean = cwe_id.strip().upper()
        if not cwe_clean.startswith("CWE-"):
            cwe_clean = f"CWE-{cwe_clean}"
        return CWE_DATABASE.get(cwe_clean)

    def get_all_cwes(self) -> List[Dict[str, Any]]:
        return list(CWE_DATABASE.values())

    def search_cwes(self, query: str) -> List[Dict[str, Any]]:
        q = query.lower()
        results = []
        for cwe_id, data in CWE_DATABASE.items():
            if (q in cwe_id.lower() or 
                q in data["name"].lower() or 
                q in data["description"].lower()):
                results.append(data)
        return results

class CAPECProvider:
    """CAPEC Provider isolates MITRE Common Attack Pattern Enumeration and Classification."""
    def get_capec(self, capec_id: str) -> Optional[Dict[str, Any]]:
        capec_clean = capec_id.strip().upper()
        if not capec_clean.startswith("CAPEC-"):
            capec_clean = f"CAPEC-{capec_clean}"
        return CAPEC_DATABASE.get(capec_clean)

    def get_all_capecs(self) -> List[Dict[str, Any]]:
        return list(CAPEC_DATABASE.values())

    def get_capecs_for_cwe(self, cwe_id: str) -> List[Dict[str, Any]]:
        cwe_clean = cwe_id.strip().upper()
        ground_truth = CWE_CAPEC_GROUND_TRUTH.get(cwe_clean, [])
        return [CAPEC_DATABASE[cid] for cid in ground_truth if cid in CAPEC_DATABASE]

class DataProvider:
    """Unified Service Interface isolating data sources behind clean providers."""
    def __init__(self):
        self.nvd = NVDProvider()
        self.cwe = CWEProvider()
        self.capec = CAPECProvider()
