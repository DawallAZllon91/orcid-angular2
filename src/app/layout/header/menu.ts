import { ApplicationMenuItemBasic } from 'src/app/types/menu.local'
import { LOCALE } from '../../../locale/messages.dynamic.en'

export const menu: ApplicationMenuItemBasic[] = [
  {
    id: 'public-layout.for_researchers',
    label: LOCALE['public-layout.for_researchers'],
    route: '/about/what-is-orcid/mission',
    activeRoute: '/',
    buttons: [
      {
        id: 'public-layout.for_researchers',
        route: '/about/what-is-orcid/mission',
        label: LOCALE['public-layout.for_researchers'],
        hideOnDesktop: true,
      },
      {
        route: '/signin',
        id: 'public-layout.sign_in',
        label: LOCALE['public-layout.sign_in'],
      },
      {
        route: '/register',
        id: 'login.registerOrcidId',
        label: LOCALE['login.registerOrcidId'],
      },
      {
        route: '/about/what-is-orcid/mission',
        id: 'manage_delegators.learn_more.link.text',
        label: LOCALE['manage_delegators.learn_more.link.text'],
      },
    ],
  },
  {
    id: 'organizations',
    route: '/organizations',
    label: LOCALE['public-layout.for_organizations'],

    buttons: [
      {
        label: LOCALE['public-layout.for_organizations'],
        id: 'organizations',
        route: '/organizations',
        hideOnDesktop: true,
      },
      {
        label: LOCALE['public-layout.funders'],
        id: 'funders',
        route: '/organizations/funders',

        buttons: [
          {
            label: LOCALE['public-layout.funders'],
            id: 'funders',
            route: '/organizations/funders', // TODO
          },
          {
            label: LOCALE['manage_delegators.learn_more.link.text'],
            id: 'learn',
            route: '/organizations/funders/learnmore',
          },
          {
            label: LOCALE['ngOrcid.outreach'],
            id: 'outreach',
            route: '/organizations/funders/outreachresources',
          },
          {
            label: LOCALE['public-layout.membership'],
            id: 'membership',
            route: '/about/membership',
          },
        ],
      },
      {
        label: LOCALE['public-layout.research_organizations'],
        id: 'research',
        route: '/organizations/research-orgs',
        buttons: [
          {
            id: 'research',
            label: LOCALE['public-layout.research_organizations'],
            route: '/organizations/research-orgs',
          },
          {
            id: 'learn',
            label: LOCALE['manage_delegators.learn_more.link.text'],
            route: '/organizations/institutions/learnmore',
          },
          {
            id: 'outreach',
            label: LOCALE['ngOrcid.outreach'],
            route: '/organizations/institutions/outreachresources',
          },
          {
            id: 'membership',
            label: LOCALE['public-layout.membership'],
            route: '/about/membership',
          },
          {
            id: 'use',
            label: LOCALE['ngOrcid.useCases'],
            route: '/organizations/institutions/usecases',
          },
        ],
      },
      {
        id: 'publishers',
        label: LOCALE['public-layout.publishers'],
        route: '/organizations/publishers',

        buttons: [
          {
            id: 'publishers',
            label: LOCALE['public-layout.publishers'],
            route: 'organizations/publishers',
          },
          {
            id: 'learn',
            label: LOCALE['manage_delegators.learn_more.link.text'],
            route: '/organizations/publishers/learnmore',
          },
          {
            id: 'outreach',
            label: LOCALE['ngOrcid.outreach'],
            route: '/organizations/publishers/outreachresources',
          },
          {
            id: 'membership',
            label: LOCALE['public-layout.membership'],
            route: '/about/membership',
          },
        ],
      },

      {
        id: 'associations',
        label: LOCALE['public-layout.associations'],
        route: '/organizations/associations',

        buttons: [
          {
            id: 'associations',
            label: LOCALE['public-layout.associations'],
            route: '/organizations/associations',
          },
          {
            id: 'learn',
            label: LOCALE['manage_delegators.learn_more.link.text'],
            route: '/organizations/associations/learnmore',
          },
          {
            id: 'outreach',
            label: LOCALE['ngOrcid.outreach'],
            route: '/organizations/associations/outreachresources',
          },
          {
            id: 'membership',
            label: LOCALE['public-layout.membership'],
            route: '/about/membership',
          },
          {
            id: 'use',
            label: LOCALE['ngOrcid.useCases'],
            route: '/organizations/associations/usecases',
          },
        ],
      },

      {
        id: 'integrators',
        label: LOCALE['public-layout.integrators'],
        route: '/organizations/integrators',
        buttons: [
          {
            id: 'integrators',
            label: LOCALE['public-layout.integrators'],
            route: '/organizations/integrators',
          },
          {
            id: 'api',
            label: LOCALE['ngOrcid.theOrcidApi'],
            route: '/organizations/integrators/API',
          },
          {
            id: 'register',
            label: LOCALE['ngOrcid.registerClientApp'],
            route: '/content/register-client-application-0',
          },
          {
            id: 'current',
            label: LOCALE['ngOrcid.currentIntegrations'],
            route: '/members',
          },
          {
            id: 'chart',
            label: LOCALE['ngOrcid.integrationsChart'],
            route: '/organizations/integrators/integration-chart',
          },
          {
            id: 'beta',
            label: LOCALE['ngOrcid.betaTesters'],
            route: '/content/beta-tester-request',
          },
        ],
      },
    ],
  },
  {
    id: 'about',
    label: LOCALE['public-layout.about'],
    route: '/about',

    buttons: [
      {
        id: 'about',
        label: LOCALE['public-layout.about'],
        hideOnDesktop: true,
      },

      {
        id: 'what',
        label: LOCALE['public-layout.what_is_orcid'],
        route: '/about/what-is-orcid/mission',
        buttons: [
          {
            id: 'what',
            label: LOCALE['public-layout.what_is_orcid'],
            route: '/about/what-is-orcid/mission',
          },
          {
            id: 'mission',
            label: LOCALE['public-layout.our_mission'],
            route: '/about/what-is-orcid/mission',
          },
          {
            id: 'principles',
            label: LOCALE['public-layout.our_principles'],
            route: '/about/what-is-orcid/our-principles',
          },
          {
            id: 'governance',
            label: LOCALE['ngOrcid.ourGovernance'],
            route: '/content/our-governance',
          },
          {
            id: 'policies',
            label: LOCALE['ngOrcid.ourPolicies'],
            buttons: [
              {
                id: 'dispute',
                label: LOCALE['ngOrcid.disputeProcedures'],
                route: '/orcid-dispute-procedures',
              },
              {
                id: 'privacyPolicy',
                label: LOCALE['change_email_preferences.privacyPolicy'],
                route: '/about/what-is-orcid/policies',
              },
              {
                id: 'terms',
                label: LOCALE['developer_tools.public_member.terms.check_2'],
                route: '/content/orcid-public-client-terms-service',
              },
              {
                id: 'publicData',
                label: LOCALE['ngOrcid.publicDataFileUsePolicy'],
                route: '/legal',
              },
              {
                id: 'trademark',
                label: LOCALE['public-layout.trademarkAndIdDisplayGuidelines'],
                route: '/trademark-and-id-display-guidelines',
              },
            ],
          },
        ],
      },
      {
        id: 'team',
        label: LOCALE['public-layout.the_orcid_team'],
        route: '/about/team',
      },
      {
        id: 'community',
        label: LOCALE['public-layout.the_orcid_community'],
        route: '/about/community',

        buttons: [
          {
            id: 'community',
            label: LOCALE['public-layout.the_orcid_community'],
            route: '/about/community',
          },
          {
            id: 'groups',
            label: LOCALE['public-layout.working_groups'],
            route: '/about/community',
          },
          {
            id: 'public-layout.sponsors',
            label: LOCALE['public-layout.sponsors'],
            route: '/about/community/sponsors',
          },
          {
            id: 'members',
            label: LOCALE['public-layout.members'],
            route: '/members',
          },
          // TODO CEHCK WHY  'LAUNCH PARTNERS' IS REPEATED,
          {
            id: 'LAUNCH',
            label: LOCALE['public-layout.launch_partners'],
            route: '/about/community/launch-partners',
          },
          {
            id: 'source',
            label: LOCALE['ngOrcid.openSource'],
            route: '/about/community/orcid-technical-community',
          },
          {
            id: 'PARTNERS',
            label: LOCALE['ngOrcid.partners'],
            route: '/content/partners',
          },
          {
            id: 'ADOPTION',
            label: LOCALE['ngOrcid.adoptionAndInt'],
            route: '/content/adoption-and-integration-program',
          },

          {
            id: 'AMBASSADORS',
            label: LOCALE['ngOrcid.outreachResources'],
            route: '/content/orcid-ambassadors',
          },
          {
            id: 'outreach',
            label: LOCALE['ngOrcid.outreach'],
            route: '/outreach-resources',
          },

          {
            id: 'GEAR',
            label: LOCALE['ngOrcid.orcidGear'],
            route: 'https://www.cafepress.com/orcid',
          },
        ],
      },

      {
        id: 'membership',
        label: LOCALE['public-layout.membership'],
        buttons: [
          {
            id: 'membership',
            label: LOCALE['public-layout.membership'],
            route: '/about/membership',
          },
          // TODO ADD 'MEMBERSHIP & SUBSCRIPTION' have the same URL as memebership

          {
            id: 'subscription',
            label: LOCALE['ngOrcid.membershipComparison'],
            route: '/about/membership/comparison',
          },
          {
            id: 'agreement',
            label: LOCALE['public-layout.standard_member_agreement'],
            route: '/document/standard-trusted-party-member-agreement',
          },
          {
            id: 'creator',
            label: LOCALE['ngOrcid.standartCreatorAgreement'],
            route: '/document/standard-trusted-party-member-agreement',
          },
          {
            id: 'our',
            label: LOCALE['public-layout.our_members'],
            route: 'members',
          },
        ],
      },
    ],
  },
  {
    id: 'help',
    label: LOCALE['public-layout.help'],
    route: '/help',

    buttons: [
      {
        id: 'help',
        label: LOCALE['public-layout.help'],
        hideOnDesktop: true,
        route: '/help',
      },
      {
        id: 'faq',
        label: LOCALE['public-layout.faq'],
        route: 'https://support.orcid.org/hc',
      },
      {
        id: 'contact',
        label: LOCALE['public-layout.contact_us'],
        route: 'https://support.orcid.org/hc/en-us/requests/new',
      },
      {
        id: 'feedback',
        label: LOCALE['public-layout.give_feedback'],
        route: 'https://support.orcid.org/hc/en-us/community/topics',
      },
      {
        id: 'base',
        label: LOCALE['public-layout.knowledge_base'],
        route: 'https://support.orcid.org/hc/en-us',
      },
    ],
  },
  {
    id: 'signIn',
    label: LOCALE['public-layout.sign_in'],
    hideOnHandset: true,
    route: '/signin',
  },
]
