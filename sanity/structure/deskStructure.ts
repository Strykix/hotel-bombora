import { StructureBuilder } from 'sanity/structure'

// Helper pour les singletons (documents uniques)
const singletonListItem = (
  S: StructureBuilder,
  typeName: string,
  title: string
) =>
  S.listItem()
    .title(title)
    .child(S.document().schemaType(typeName).documentId(typeName))

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Athmaya Villa')
    .items([
      // SINGLETONS
      singletonListItem(S, 'siteSettings', 'Paramètres du site'),
      singletonListItem(S, 'homepage', 'Page d\'accueil'),

      S.divider(),

      // CONTENU
      S.listItem()
        .title('Chambres')
        .child(S.documentTypeList('room').title('Chambres')),

      S.listItem()
        .title('Équipements')
        .child(S.documentTypeList('amenityCategory').title('Catégories d\'équipements')),

      S.listItem()
        .title('Expériences')
        .child(S.documentTypeList('experience').title('Expériences locales')),

      S.listItem()
        .title('Galerie photos')
        .child(S.documentTypeList('galleryImage').title('Photos')),

      S.divider(),

      // TARIFS
      S.listItem()
        .title('Tarifs')
        .child(
          S.list()
            .title('Gestion des tarifs')
            .items([
              S.listItem()
                .title('Saisons')
                .child(S.documentTypeList('season').title('Saisons tarifaires')),
              S.listItem()
                .title('Extras')
                .child(S.documentTypeList('extra').title('Services supplémentaires')),
            ])
        ),

      S.divider(),

      // AVIS & FAQ
      S.listItem()
        .title('Témoignages')
        .child(S.documentTypeList('testimonial').title('Avis clients')),

      S.listItem()
        .title('FAQ')
        .child(S.documentTypeList('faqItem').title('Questions fréquentes')),
    ])
