// ─── Types & Constants shared across the site ────────────────────────────────

export interface ReleaseAsset {
  name: string
  browser_download_url: string
  size: number
}

export interface Release {
  tag_name: string
  name: string
  published_at: string
  html_url: string
  body: string
  assets: ReleaseAsset[]
}

export const SERVER_REPO = 'AccesDistance/SERVER-SOFTWARE'
export const APP_REPO    = 'AccesDistance/APPLICATION-MOBILE'

export const DEFAULT_SERVER_RELEASE: Release = {
  tag_name: 'v2.0.0',
  name: 'Release v2.0.0 (Chiffrement AES-256 & Sécurité)',
  published_at: new Date().toISOString(),
  html_url: `https://github.com/${SERVER_REPO}/releases/latest`,
  body: 'Mise à jour majeure v2.0 :\n• Chiffrement symétrique AES-256-GCM sur le flux TCP vidéo et handshake résolution.\n• Authentification cryptographique HMAC-SHA256 sur tous les paquets UDP tactiles.\n• Handshake TCP challenge-response avec clé secrète pré-partagée (PSK).\n• Protection anti-DDoS avec rate limiting (60 req/s/IP) et bannissement automatique IP (300s).\n• Suivi des appareils par Device ID persistant dans devices.json.\n• Validation stricte des commandes par liste blanche.\n• Journalisation structurée quotidienne sur 30 jours (logs/server.log).',
  assets: [
    {
      name: 'server-windows.exe',
      browser_download_url: `https://github.com/${SERVER_REPO}/releases/latest/download/server-windows.exe`,
      size: 15.4 * 1024 * 1024,
    },
    {
      name: 'server-linux',
      browser_download_url: `https://github.com/${SERVER_REPO}/releases/latest/download/server-linux`,
      size: 18.2 * 1024 * 1024,
    },
    {
      name: 'server-macos',
      browser_download_url: `https://github.com/${SERVER_REPO}/releases/latest/download/server-macos`,
      size: 19.1 * 1024 * 1024,
    },
  ],
}

export const DEFAULT_APP_RELEASE: Release = {
  tag_name: 'v2.0.0',
  name: 'Release v2.0.0 (Sécurité AES-256, Splash & Docs)',
  published_at: new Date().toISOString(),
  html_url: `https://github.com/${APP_REPO}/releases/latest`,
  body: "Mise à jour majeure v2.0 de l'APK :\n• Écran de démarrage animé (Splash Screen) avec logo et halo lumineux.\n• Module de sécurité complet avec chiffrement AES-256-GCM via PointyCastle.\n• Signature HMAC-SHA256 avec numéro de séquence anti-rejeu sur les actions tactiles.\n• Génération et persistance d'un Device ID unique (UUID v4) basé sur le matériel Android.\n• Vérificateur de mises à jour intégré avec téléchargement direct d'APK et artefacts GitHub Actions.\n• Page interactive de documentation et guide réseau étape par étape.\n• Page À propos du développeur avec liens vers portfolio et réseaux.\n• Dialogue de gestion de la sécurité et clé PSK.",
  assets: [
    {
      name: 'app-release.apk',
      browser_download_url: `https://github.com/${APP_REPO}/releases/latest/download/app-release.apk`,
      size: 47.8 * 1024 * 1024,
    },
  ],
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

export function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })
  } catch {
    return iso
  }
}
