import type { NextPage } from 'next';

import { Header, Layout, Meta } from '@/components/layout';

const team = [
  {
    name: 'Steve Lehman',
    image: '97272A0E-D266-11EC-B16A-1264252C9D0B.jpg',
    title: 'Chairman - Investor',
    url: '#',
  },
  {
    name: 'Thom Beers',
    image: '7690D1E6-D266-11EC-A797-0EE6DBEF7B7F.jpg',
    title: 'Investor & Executive Chairman',
    url: '#',
  },
  {
    name: 'Sean Walsh',
    image: 'F37BD48A-D266-11EC-8EA7-0E3C71A7CD81.jpg',
    title: 'Creative Director',
    url: '#',
  },
  {
    name: 'Kat Buchanan',
    image: '16BE684A-D267-11EC-99DB-0E24238C8A2B.jpg',
    title: 'Director of Community & Operations',
    url: '/profile/kat-buchanan',
  },
  {
    name: 'Adi Nuta',
    image: '3ACBF5F8-D263-11EC-ACF8-0EA8D3F9F8A7.jpg',
    title: 'Executive Lead Developer',
    url: '/profile/adi-nuta',
  },
  {
    name: 'Lovey Dhillon',
    image: '60899DC4-D266-11EC-8D70-12981491DD8B.jpg',
    title: 'UI/UX Lead',
    url: '/profile/lovey-dhillon-1',
  },
  {
    name: 'Justina Mwangi',
    image: 'CF7A3A38-E132-11EC-9738-0E654904CF99.jpg',
    title: 'Community Manager',
    url: '#',
  },
  {
    name: 'Navjot K. Dhillon',
    image: '51A7BDA4-D26B-11EC-AFA2-12A5965DAF29.jpg',
    title: 'Lead Front end Developer',
    url: '#',
  },
  {
    name: 'Michelle Harris',
    image: '0ACD2076-D267-11EC-AA6F-0E035A02C2E5.jpg',
    title: 'PR Communications',
    url: '#',
  },
  {
    name: 'Danielle Harris',
    image: '2F677526-D267-11EC-8B41-0E46375EBCA9.jpg',
    title: 'PR Communications',
    url: '#',
  },
  {
    name: 'Joshua Wenner',
    image: '22CADE02-D267-11EC-AA98-0E87B57F38DF.jpg',
    title: 'Host & Executive Advisor',
    url: '/profile/joshua-wenner',
  },
  {
    name: 'Amy Zwagerman',
    image: 'BCDDFFAC-D266-11EC-9D54-122D26FBB80D.jpg',
    title: 'Host',
    url: '/profile/amy-zwagerman',
  },
  {
    name: 'Chand Chadha',
    image: '515D38D2-D267-11EC-8B15-122C94C1106B.jpg',
    title: 'Marketing',
    url: '#',
  },
];

const Team: NextPage = () => {
  return (
    <Layout
      meta={
        <Meta
          title="Meet the team - CoFoundersLab"
          description="Meet the CoFoundersLab team, the leading entrepreneurial network where like-minded entrepreneurs connect, meet and collaborate."
        />
      }
      header={<Header sticky={true} />}
    >
      <div className="bg-gray-50">
        <div className="mx-auto max-w-7xl py-12 px-4 text-center sm:px-6 lg:px-8 lg:py-24">
          <div className="space-y-12">
            <div className="space-y-5 sm:mx-auto sm:max-w-xl sm:space-y-4 lg:max-w-5xl">
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                Meet the team
              </h2>
            </div>
            <ul
              role="list"
              className="mx-auto space-y-16 sm:grid sm:grid-cols-2 sm:gap-16 sm:space-y-0 lg:max-w-5xl lg:grid-cols-3"
            >
              {team.map((user, i) => (
                <li key={i}>
                  <div className="space-y-6">
                    <img
                      className="mx-auto h-40 w-40 rounded-full xl:h-48 xl:w-48"
                      src={'/assets/images/team/' + user.image}
                      alt={user.name}
                    />
                    <div className="space-y-2">
                      <div className="space-y-1 text-lg font-medium leading-6">
                        <h3>{user.name}</h3>
                        <p className="text-blue-600">{user.title}</p>
                      </div>
                      <ul role="list" className="flex justify-center space-x-5">
                        <li>
                          <a
                            href={user.url}
                            className="text-gray-400 hover:text-gray-500"
                          >
                            <span className="sr-only">CoFoundersLab</span>
                            <svg
                              className="h-5 w-5"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 136.07 136.07"
                            >
                              <g id="Layer_2" data-name="Layer 2">
                                <g id="Layer_1-2" data-name="Layer 1">
                                  <path
                                    className="cls-1"
                                    d="M93.07,81.93a40.24,40.24,0,0,1-11,8.11,27.79,27.79,0,0,1-11.5,2.35A27.17,27.17,0,0,1,57.19,89a23.8,23.8,0,0,1-9.36-9.28,27.15,27.15,0,0,1-3.31-13.48A25.48,25.48,0,0,1,70.34,40.46c8.38,0,16,3.51,22.76,10.46l9.14-8.71A42.32,42.32,0,0,0,70.56,27.83,40.23,40.23,0,0,0,50.62,33,37,37,0,0,0,36.4,46.74a38.24,38.24,0,0,0-5,19.51c0,11.26,3.67,20.62,10.9,27.81s16.66,10.85,28,10.85a42.11,42.11,0,0,0,16.53-3.07c4.7-2,9.75-5.58,15-10.67Z"
                                  />
                                  <path
                                    className="cls-1"
                                    d="M86.89,101.84a42.11,42.11,0,0,1-16.53,3.07c-11.36,0-20.79-3.65-28-10.85s-10.9-16.55-10.9-27.81a38.24,38.24,0,0,1,5-19.51A37,37,0,0,1,50.62,33a40.23,40.23,0,0,1,19.94-5.2,42.32,42.32,0,0,1,31.68,14.38L93.1,50.92c-6.72-7-14.38-10.46-22.76-10.46A25.48,25.48,0,0,0,44.52,66.27a27.15,27.15,0,0,0,3.31,13.48A23.8,23.8,0,0,0,57.19,89a27.17,27.17,0,0,0,13.4,3.36A27.79,27.79,0,0,0,82.09,90a40.24,40.24,0,0,0,11-8.11l8.85,9.24C96.64,96.26,91.59,99.85,86.89,101.84Z"
                                  />
                                  <path
                                    className="cls-1"
                                    d="M13.06,109.76V26.31A13.26,13.26,0,0,1,26.31,13.06H60.23V0H26.31A26.34,26.34,0,0,0,0,26.31v83.45a26.34,26.34,0,0,0,26.31,26.31H60.23V123H26.31A13.26,13.26,0,0,1,13.06,109.76Z"
                                  />
                                  <path
                                    className="cls-1"
                                    d="M60.23,123v13.06H26.31A26.34,26.34,0,0,1,0,109.76V26.31A26.34,26.34,0,0,1,26.31,0H60.23V13.06H26.31A13.26,13.26,0,0,0,13.06,26.31v83.45A13.26,13.26,0,0,0,26.31,123Z"
                                  />
                                  <path
                                    className="cls-1"
                                    d="M109.76,0H75.84V13.06h33.92A13.26,13.26,0,0,1,123,26.31v83.45A13.26,13.26,0,0,1,109.76,123H75.84v13.06h33.92a26.34,26.34,0,0,0,26.31-26.31V26.31A26.34,26.34,0,0,0,109.76,0Z"
                                  />
                                  <path
                                    className="cls-1"
                                    d="M136.07,109.76a26.34,26.34,0,0,1-26.31,26.31H75.84V123h33.92A13.26,13.26,0,0,0,123,109.76V26.31a13.26,13.26,0,0,0-13.25-13.25H75.84V0h33.92a26.34,26.34,0,0,1,26.31,26.31Z"
                                  />
                                </g>
                              </g>
                            </svg>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Team;
