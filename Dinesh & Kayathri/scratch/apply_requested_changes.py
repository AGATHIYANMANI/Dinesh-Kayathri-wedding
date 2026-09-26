import base64
import os
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

print("=== Applying User Requested Changes to Dinesh_Kayathri_Wedding_Invitation_Final (1).html ===")

target_file = r"Dinesh_Kayathri_Wedding_Invitation_Final (1).html"
with open(target_file, "r", encoding="utf-8") as f:
    html = f.read()

# -------------------------------------------------------------------------
# 1. Update Couple Avatar Image on Second Page
# -------------------------------------------------------------------------
# Load the newly created crop of the 2nd uploaded image
new_avatar_path = "assets/invitation/couple-portrait-perfect.jpg"
with open(new_avatar_path, "rb") as f:
    new_avatar_b64 = "data:image/jpeg;base64," + base64.b64encode(f.read()).decode("utf-8")

# Also copy this file to assets/invitation/couple-portrait.jpg for the workspace
import shutil
shutil.copy(new_avatar_path, "assets/invitation/couple-portrait.jpg")
print("✓ Updated assets/invitation/couple-portrait.jpg with the 2nd uploaded couple photo")

# Replace in HTML
m_avatar = re.search(r'(<div class="couple-avatar-glow">\s*<img\s+src=")(data:image/[^;]+;base64,[^"]+)(")', html)
if m_avatar:
    html = html[:m_avatar.start(2)] + new_avatar_b64 + html[m_avatar.end(2):]
    print("✓ Successfully replaced couple avatar image on Second Page in HTML")
else:
    print("✗ ERROR: could not locate couple-avatar-glow img in HTML")

# -------------------------------------------------------------------------
# 2. Remove the Top Button "Switch to Full Screen" (#viewModeBtn)
# -------------------------------------------------------------------------
btn_pattern = re.compile(
    r'\s*<!-- View Mode Toggle[^>]*-->\s*<button[^>]*id="viewModeBtn"[^>]*>.*?</button>',
    re.DOTALL
)
if btn_pattern.search(html):
    html = btn_pattern.sub('', html)
    print("✓ Successfully removed top button 'Switch to Full Screen' (#viewModeBtn)")
else:
    print("✗ ERROR: could not find #viewModeBtn in HTML")

# -------------------------------------------------------------------------
# 3. Update Falling Animation to 3D Animated Hearts
# -------------------------------------------------------------------------
# 3a. Update CSS in <style>
# Find the particle section in <style>
old_particle_css = """/* Floating Gold Sparkles / Petals */
.floating-particle {
  position: absolute;
  top: -6vh;
  color: var(--gold-light);
  opacity: 0;
  user-select: none;
  animation: particleFall linear infinite;
}

@keyframes particleFall {
  0% {
    transform: translate3d(0, -6vh, 0) rotate(0deg) scale(0.7);
    opacity: 0;
  }
  15% {
    opacity: 0.65;
  }
  85% {
    opacity: 0.65;
  }
  100% {
    transform: translate3d(var(--drift, 20px), 106vh, 0) rotate(var(--rot, 360deg)) scale(1);
    opacity: 0;
  }
}"""

new_particle_css = """/* ==========================================================================
   3D Animated Falling Hearts Engine
   Realistic Spatial Perspective & Tumbling Across All Pages
   ========================================================================== */
.heart-rain {
  position: fixed;
  inset: 0;
  perspective: 1000px;
  perspective-origin: 50% 15%;
  pointer-events: none;
  overflow: hidden;
  z-index: 1;
}

.heart-3d-particle {
  position: absolute;
  top: -70px;
  pointer-events: none;
  user-select: none;
  transform-style: preserve-3d;
  animation: heartFall3D linear infinite;
  will-change: transform, opacity;
}

.heart-3d-inner {
  display: inline-block;
  transform-style: preserve-3d;
  animation: heartTumble3D ease-in-out infinite alternate;
  filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.32));
  will-change: transform;
}

.heart-3d-svg {
  display: block;
  width: 100%;
  height: 100%;
  overflow: visible;
}

@keyframes heartFall3D {
  0% {
    transform: translate3d(0, -70px, var(--tz, 0px));
    opacity: 0;
  }
  12% {
    opacity: var(--max-op, 0.85);
  }
  85% {
    opacity: var(--max-op, 0.85);
  }
  100% {
    transform: translate3d(var(--drift, 30px), 108vh, var(--tz, 0px));
    opacity: 0;
  }
}

@keyframes heartTumble3D {
  0% {
    transform: rotateX(0deg) rotateY(0deg) rotateZ(var(--rot-init, -15deg)) scale(1);
  }
  30% {
    transform: rotateX(65deg) rotateY(110deg) rotateZ(20deg) scale(0.92);
  }
  65% {
    transform: rotateX(-50deg) rotateY(230deg) rotateZ(-30deg) scale(1.08);
  }
  100% {
    transform: rotateX(360deg) rotateY(360deg) rotateZ(var(--rot-end, 45deg)) scale(1);
  }
}

/* Floating Gold Sparkles / Dust for Envelope Seal */
.floating-particle {
  position: absolute;
  top: -6vh;
  color: var(--gold-light);
  opacity: 0;
  user-select: none;
  animation: particleFall linear infinite;
}

@keyframes particleFall {
  0% {
    transform: translate3d(0, -6vh, 0) rotate(0deg) scale(0.7);
    opacity: 0;
  }
  15% {
    opacity: 0.65;
  }
  85% {
    opacity: 0.65;
  }
  100% {
    transform: translate3d(var(--drift, 20px), 106vh, 0) rotate(var(--rot, 360deg)) scale(1);
    opacity: 0;
  }
}"""

if old_particle_css in html:
    html = html.replace(old_particle_css, new_particle_css)
    print("✓ Successfully replaced particle CSS in <style> with 3D Falling Hearts Engine CSS")
else:
    # Try regex match
    pattern_p_css = re.compile(r'/\* Floating Gold Sparkles / Petals \*/.*?@keyframes particleFall\s*\{[^}]*\}', re.DOTALL)
    if pattern_p_css.search(html):
        html = pattern_p_css.sub(new_particle_css, html)
        print("✓ Replaced particle CSS via regex in <style>")
    else:
        print("✗ Could not locate particle CSS block in <style>")

# 3b. Update JavaScript function in <script>
# Replace initParticleRain
new_js_rain = """  /* ==========================================================================
     1. 3D Animated Falling Hearts Engine (All Pages)
     ========================================================================== */
  function initParticleRain() {
    if (!dom.heartRain) return;
    dom.heartRain.innerHTML = '';

    // Color palettes for dimensional 3D wedding hearts
    const heartThemes = [
      // 0: Royal Velvet Maroon & Deep Crimson
      {
        id: 'crimson',
        gradStart: '#FF3366',
        gradMid: '#C2185B',
        gradEnd: '#7A0C24',
        glow: 'rgba(255, 51, 102, 0.45)',
        highlight: 'rgba(255, 255, 255, 0.55)'
      },
      // 1: 24K Rich Metallic Gold
      {
        id: 'gold',
        gradStart: '#FFF6D1',
        gradMid: '#F5C84C',
        gradEnd: '#B8860B',
        glow: 'rgba(245, 200, 76, 0.55)',
        highlight: 'rgba(255, 255, 255, 0.65)'
      },
      // 2: Romantic Rose Gold / Blush
      {
        id: 'rosegold',
        gradStart: '#FFD1DC',
        gradMid: '#E87A90',
        gradEnd: '#A8324F',
        glow: 'rgba(232, 122, 144, 0.4)',
        highlight: 'rgba(255, 255, 255, 0.6)'
      },
      // 3: Vivid Ruby Red
      {
        id: 'ruby',
        gradStart: '#FF5252',
        gradMid: '#D50000',
        gradEnd: '#8B0000',
        glow: 'rgba(255, 82, 82, 0.5)',
        highlight: 'rgba(255, 255, 255, 0.5)'
      }
    ];

    const heartCount = 36;

    for (let i = 0; i < heartCount; i++) {
      const theme = heartThemes[i % heartThemes.length];
      const p = document.createElement('div');
      p.className = 'heart-3d-particle';

      // Dimensions & Depth distribution
      const size = 16 + (i * 9) % 22; // 16px to 38px
      const leftPos = ((i * 19 + 7) % 94); // Spread horizontally
      const duration = 6.5 + (i % 7) * 1.1; // 6.5s to 14.2s
      const delay = -((i * 0.55) % 11); // Stagger so screen is pre-populated
      const drift = (i % 2 === 0 ? 1 : -1) * (20 + (i * 7) % 45); // Lateral sway
      const zDepth = ((i % 5) - 2) * 45; // -90px to +90px translateZ depth
      const maxOp = 0.55 + ((i % 4) * 0.12); // 0.55 to 0.91 opacity
      const rotInit = ((i * 37) % 60) - 30; // -30deg to +30deg
      const rotEnd = ((i * 53) % 90) - 45;

      p.style.left = `${leftPos}%`;
      p.style.width = `${size}px`;
      p.style.height = `${size}px`;
      p.style.animationDuration = `${duration}s`;
      p.style.animationDelay = `${delay}s`;
      p.style.setProperty('--drift', `${drift}px`);
      p.style.setProperty('--tz', `${zDepth}px`);
      p.style.setProperty('--max-op', `${maxOp}`);

      // 3D Inner Wrapper for independent 3D tumbling rotation
      const inner = document.createElement('div');
      inner.className = 'heart-3d-inner';
      inner.style.width = '100%';
      inner.style.height = '100%';
      inner.style.animationDuration = `${3.2 + (i % 5) * 0.8}s`;
      inner.style.animationDelay = `${-((i * 0.4) % 4)}s`;
      inner.style.setProperty('--rot-init', `${rotInit}deg`);
      inner.style.setProperty('--rot-end', `${rotEnd}deg`);

      const gradId = `hGrad_${i}_${theme.id}`;
      // High-definition 3D curved SVG heart with glossy bevel highlight
      inner.innerHTML = `
        <svg class="heart-3d-svg" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="${gradId}" cx="35%" cy="30%" r="65%">
              <stop offset="0%" stop-color="${theme.gradStart}"/>
              <stop offset="45%" stop-color="${theme.gradMid}"/>
              <stop offset="100%" stop-color="${theme.gradEnd}"/>
            </radialGradient>
          </defs>
          <!-- 3D Heart Body with Dimensional Radial Lighting -->
          <path d="M16 28.5 C16 28.5 3 20.5 3 10.5 C3 5.5 7 2 11.5 2 C14.2 2 15.5 3.5 16 4.5 C16.5 3.5 17.8 2 20.5 2 C25 2 29 5.5 29 10.5 C29 20.5 16 28.5 16 28.5 Z" 
                fill="url(#${gradId})"/>
          <!-- Top Glossy Specular Bevel Curve -->
          <path d="M6.5 9.5 C6.5 6 9 3.8 11.8 3.8 C13.5 3.8 14.8 4.7 15.5 5.8 C14.5 4.8 13.2 4.2 11.8 4.2 C9.2 4.2 7 6.2 7 9.2 C7 11.2 8 13.5 9.5 15.5 C8 13.5 6.5 11.5 6.5 9.5 Z" 
                fill="${theme.highlight}" opacity="0.6"/>
        </svg>
      `;

      p.appendChild(inner);
      dom.heartRain.appendChild(p);
    }
  }

  """

pattern_js_rain = re.compile(
    r'/\*\s*=+.*?'
    r'1\. Particle Rain.*?'
    r'function initParticleRain\(\)\s*\{.*?'
    r'function initEnvelopeDust',
    re.DOTALL
)

if pattern_js_rain.search(html):
    html = pattern_js_rain.sub(new_js_rain + "function initEnvelopeDust", html)
    print("✓ Successfully replaced initParticleRain() with 3D Falling Hearts Engine in <script>")
else:
    # Alternative slice
    idx1 = html.find('function initParticleRain()')
    idx2 = html.find('function initEnvelopeDust()')
    if idx1 != -1 and idx2 != -1:
        # Find start of comment before initParticleRain
        idx_comm = html.rfind('/* ===', 0, idx1)
        if idx_comm == -1: idx_comm = idx1
        html = html[:idx_comm] + new_js_rain + html[idx2:]
        print("✓ Replaced initParticleRain via slice in <script>")
    else:
        print("✗ Could not locate initParticleRain in <script>")

# Save updated Dinesh_Kayathri_Wedding_Invitation_Final (1).html
with open(target_file, "w", encoding="utf-8") as f:
    f.write(html)

print(f"✓ Saved updated {target_file} ({os.path.getsize(target_file)} bytes)")

# Also create the preview and clean distribution files
with open("wedding-invitation-preview.html", "w", encoding="utf-8") as f:
    f.write(html)
print("✓ Saved updated wedding-invitation-preview.html")

with open("Dinesh_Kayathri_Wedding_Invitation_Final.html", "w", encoding="utf-8") as f:
    f.write(html)
print("✓ Saved updated Dinesh_Kayathri_Wedding_Invitation_Final.html")
