import os

LOCALES_DIR = "src/shared/locales"

NEW_KEYS = {
    "external-aria2-section": "External Aria2",
    "use-external-aria2": "Use external aria2",
    "external-aria2-host": "Host",
    "external-aria2-port": "Port",
    "external-aria2-secret": "RPC Secret",
    "external-aria2-tip": "When enabled, Motrix Next will connect to an external aria2 instance instead of launching its built-in sidecar.",
}

def insert_before_engine_section(content, translations):
    lines = content.split('\n')
    insert_idx = None
    for i, line in enumerate(lines):
        if "'engine-section'" in line or '"engine-section"' in line:
            insert_idx = i
            break
    
    if insert_idx is None:
        for i, line in enumerate(lines):
            if "'rpc-secret-empty-title'" in line or '"rpc-secret-empty-title"' in line:
                insert_idx = i + 1
                break
    
    if insert_idx is None:
        print("  WARN: could not find insertion point")
        return content
    
    new_lines = []
    for key, value in translations.items():
        escaped = value.replace("'", "\\'")
        new_lines.append(f"  '{key}': '{escaped}',")
    
    lines.insert(insert_idx, "")
    for nl in reversed(new_lines):
        lines.insert(insert_idx, nl)
    
    return '\n'.join(lines)

def update_locale(filepath, translations):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    
    if "'external-aria2-section'" in content or '"external-aria2-section"' in content:
        print("  SKIP: already has keys")
        return
    
    new_content = insert_before_engine_section(content, translations)
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(new_content)
    print("  UPDATED")

for locale in sorted(os.listdir(LOCALES_DIR)):
    locale_dir = os.path.join(LOCALES_DIR, locale)
    if not os.path.isdir(locale_dir):
        continue
    filepath = os.path.join(locale_dir, "preferences.js")
    if not os.path.exists(filepath):
        continue
    print(f"Processing {locale}...")
    update_locale(filepath, NEW_KEYS)

print("Done!")
