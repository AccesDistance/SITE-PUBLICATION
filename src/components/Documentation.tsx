import React, { useState } from 'react'
import { Copy, Check, CheckCircle2 } from 'lucide-react'
import { AccordionItem } from './AccordionItem'

export const Documentation: React.FC = () => {
  const [openDocStep, setOpenDocStep] = useState<string>('01')
  const [copiedCmd, setCopiedCmd] = useState(false)

  const handleCopyCommand = () => {
    navigator.clipboard.writeText('python server.py')
    setCopiedCmd(true)
    setTimeout(() => setCopiedCmd(false), 2000)
  }

  const toggleStep = (step: string) => {
    setOpenDocStep(openDocStep === step ? '' : step)
  }

  return (
    <section id="docs" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-[#1f293d]">
      <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
        <span className="text-xs sm:text-sm font-bold text-blue-500 uppercase tracking-widest">
          Guide de Configuration
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mt-2.5 mb-3 tracking-tight">
          Comment démarrer en quelques clics
        </h2>
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed px-2">
          Suivez les étapes ci-dessous pour déployer le serveur PC et connecter votre smartphone en toute sécurité.
        </p>
      </div>

      <div className="flex flex-col gap-3.5 sm:gap-4">
        {/* Step 1 */}
        <AccordionItem
          id="step-1"
          step="01"
          title="Lancer le serveur PC (Prêt à l'emploi)"
          isOpen={openDocStep === '01'}
          onToggle={() => toggleStep('01')}
        >
          <p className="mb-3.5 text-slate-300">
            Double-cliquez sur l'exécutable téléchargé ou lancez le script Python sur votre PC. 
            Le serveur configure automatiquement le chiffrement AES-256-GCM et copie la clé prête à l'emploi dans votre presse-papier :
          </p>

          <div className="bg-[#0b0f19] rounded-xs p-3.5 sm:p-4 font-mono text-xs sm:text-sm border border-[#1f293d] text-slate-300 flex flex-col gap-2 overflow-x-auto shadow-inner">
            <div className="flex justify-between items-center pb-2 border-b border-[#1f293d]/60">
              <span className="text-slate-500 text-[11px] sm:text-xs">
                # Windows / Linux / macOS (Double-clic ou Terminal)
              </span>
              <button
                type="button"
                onClick={handleCopyCommand}
                className="bg-[#1e293b] hover:bg-blue-600 text-slate-300 hover:text-white px-2.5 py-1 rounded text-[11px] sm:text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copiedCmd ? (
                  <Check size={12} className="text-emerald-400" />
                ) : (
                  <Copy size={12} />
                )}
                <span>{copiedCmd ? 'Copié !' : 'Copier'}</span>
              </button>
            </div>
            <div className="text-blue-400 font-bold mt-1">&gt; python server.py</div>
            <div className="text-slate-600 my-0.5">──────────────────────────────────────────</div>
            <div className="text-white font-bold">ACCESDISTANCE — SERVEUR SÉCURISÉ v2.0 (Prêt à l'emploi)</div>
            <div className="text-blue-400">-&gt; IP du PC       : 192.168.1.50</div>
            <div className="text-slate-400">-&gt; Ports Réseau   : TCP 9999 (Vidéo)  |  UDP 9998 (Tactile)</div>
            <div className="text-emerald-400 font-semibold">-&gt; Chiffrement    : AES-256-GCM ACTIF AUTOMATIQUEMENT ✅</div>
            <div className="text-emerald-400 font-semibold">-&gt; Clé Sécurité   : Copiée automatiquement dans le presse-papier !</div>
            <div className="text-slate-300">-&gt; Appairage      : 100% Automatique sans configuration requise</div>
          </div>
        </AccordionItem>

        {/* Step 2 */}
        <AccordionItem
          id="step-2"
          step="02"
          title="Installer l'application mobile APK v2.0"
          isOpen={openDocStep === '02'}
          onToggle={() => toggleStep('02')}
        >
          <p className="mb-3 text-slate-300">
            Transférez le fichier{' '}
            <code className="text-blue-400 bg-[#0b0f19] px-2 py-0.5 rounded text-xs font-mono border border-blue-900/40">
              app-release.apk
            </code>{' '}
            sur votre téléphone et procédez à l'installation :
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-300 pl-1">
            <li>Autorisez l'installation depuis des sources inconnues dans les paramètres Android si nécessaire.</li>
            <li>Ouvrez l'application <strong>AccesDistance</strong> : le chiffrement fort est déjà activé par défaut.</li>
            <li>Assurez-vous que votre téléphone et votre PC sont sur le <strong>même réseau Wi-Fi local</strong>.</li>
          </ul>
        </AccordionItem>

        {/* Step 3 */}
        <AccordionItem
          id="step-3"
          step="03"
          title="Chiffrement Fort 100% Automatique (Clé Personnalisée Facultative)"
          isOpen={openDocStep === '03'}
          onToggle={() => toggleStep('03')}
        >
          <div className="p-3 bg-emerald-950/40 border border-emerald-800/40 rounded-xs mb-3 text-emerald-300 flex items-start gap-2.5">
            <CheckCircle2 size={18} className="shrink-0 mt-0.5 text-emerald-400" />
            <div>
              <strong>Zéro manipulation technique requise :</strong> Le chiffrement AES-256-GCM et les signatures HMAC-SHA256 fonctionnent <strong>immédiatement dès le premier lancement</strong> sans rien avoir à copier ou coller !
            </div>
          </div>
          <p className="mb-2 text-slate-300">
            <strong>Pour les utilisateurs avancés (optionnel) :</strong> Si vous souhaitez définir une clé personnalisée :
          </p>
          <ol className="list-decimal list-inside space-y-2 text-slate-300 pl-1">
            <li>
              La clé est déjà <strong>automatiquement copiée dans votre presse-papier PC</strong> dès le lancement du serveur.
            </li>
            <li>
              Elle est également consultable dans la console ou dans le fichier{' '}
              <code className="text-emerald-400 bg-[#0b0f19] px-2 py-0.5 rounded text-xs font-mono border border-emerald-900/40">
                accesdistance.key
              </code>
              .
            </li>
            <li>
              Dans l'application mobile, ouvrez <strong>Sécurité & Clé PSK</strong> pour la coller si vous souhaitez une clé unique sur mesure.
            </li>
          </ol>
        </AccordionItem>

        {/* Step 4 */}
        <AccordionItem
          id="step-4"
          step="04"
          title="Se connecter et prendre le contrôle en temps réel"
          isOpen={openDocStep === '04'}
          onToggle={() => toggleStep('04')}
        >
          <p className="mb-3 text-slate-300">
            Saisissez l'adresse IP du PC (exemple :{' '}
            <code className="text-blue-400 bg-[#0b0f19] px-2 py-0.5 rounded text-xs font-mono border border-blue-900/40">
              192.168.1.50
            </code>
            ) et touchez <strong>Se connecter</strong>.
          </p>
          <div className="bg-[#0b0f19] border border-emerald-900/40 rounded-xs p-3 sm:p-4 text-xs sm:text-sm text-emerald-400 flex items-center gap-3">
            <CheckCircle2 size={18} className="shrink-0" />
            <span>Le handshake challenge-response s'effectue automatiquement en moins d'une seconde !</span>
          </div>
        </AccordionItem>

        {/* Step 5 */}
        <AccordionItem
          id="step-5"
          step="05"
          title="Dépannage, Pare-feu Windows & Mises à jour"
          isOpen={openDocStep === '05'}
          onToggle={() => toggleStep('05')}
        >
          <ul className="list-disc list-inside space-y-2 text-slate-300 pl-1">
            <li>
              <strong>Pare-feu Windows :</strong> Autorisez les ports 9999 (TCP flux vidéo) et 9998 (UDP commandes) si
              la connexion ne s'établit pas.
            </li>
            <li>
              <strong>Système anti-bruteforce :</strong> Après 5 échecs consécutifs d'authentification, l'IP est bannie
              300 secondes. Vérifiez la clé dans{' '}
              <code className="text-emerald-400 bg-[#0b0f19] px-1.5 py-0.5 rounded text-xs font-mono">
                accesdistance.key
              </code>
              .
            </li>
            <li>
              <strong>Mise à jour intégrée :</strong> Utilisez le bouton "Mise à jour APK" sur l'accueil de l'application
              pour vérifier et télécharger les nouvelles versions sans passer par un navigateur.
            </li>
          </ul>
        </AccordionItem>
      </div>
    </section>
  )
}
