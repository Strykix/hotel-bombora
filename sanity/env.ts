// Mode statique : ne pas utiliser Sanity
// En mode statique ou si les vars Sanity sont absentes, on utilise des valeurs par défaut
const isStaticMode = process.env.NEXT_PUBLIC_STATIC_MODE === 'true' ||
  !process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  !process.env.NEXT_PUBLIC_SANITY_DATASET

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-05'

// Ne jamais throw - utiliser des valeurs par défaut si les vars sont manquantes
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'static-mode'

// Export pour vérifier le mode
export { isStaticMode }
