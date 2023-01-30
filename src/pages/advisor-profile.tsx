import React from 'react';

import { Layout } from '@/components/layout';
import ProfileView from '@/components/profile/advisorProfileView';

import profile from './settings/profile';

export default function AdvisorPage() {
  return (
    <Layout
      showLeftSidebar
      // meta={
      //   <Meta
      //     title={`${profile.firstName} ${profile.lastName} - Entrepreneurs from ${profile?.city?.name} on CoFoundersLab`}
      //     description={`${profile.firstName} ${profile.lastName} ${profile.role} CoFoundersLab profile. The leading entrepreneurial network where like-minded entrepreneurs connect, meet and collaborate.`}
      //   />
      // }
    >
      <div className="h-full border-t border-b border-gray-200">
        <div className="max-w-8xl mx-auto mt-10 px-4">
          <h1 className="sr-only">Profile</h1>
          <div>
            <ProfileView profile={profile} />
          </div>
          <div className="mt-5 rounded-md bg-white px-5 py-4 shadow md:px-8">
            <div className="text-lg font-bold md:text-[32px]">About</div>
            <div className="text-md pt-5 md:text-[24px]">
              Lorem ipsum dolor sit amet consectetur. Aliquet quis ultricies
              nulla vel amet consectetur ornare nulla facilisis. Tempor
              scelerisque morbi fermentum elementum. Tempus mi cursus et nunc
              at. Molestie ultricies sed senectus magna euismod dictum. Volutpat
              magna ornare ac nisi. Eu ultricies ut vitae gravida nisl donec.
              Convallis egestas senectus egestas pharetra fringilla. Laoreet vel
              viverra amet aliquet risus platea faucibus. Donec arcu hendrerit
              fermentum aliquam malesuada. Varius non elit faucibus egestas diam
              tincidunt orci in nam. Gravida duis nibh ultrices elementum sit
              metus. Aliquet mus aliquet purus laoreet amet dignissim et
              viverra. Et metus tellus integer volutpat. Quam neque congue leo
              adipiscing suspendisse tortor a ornare. Et tellus tellus justo sit
              ornare. Pellentesque erat est amet elementum. Cursus ut quis
              semper malesuada eros nunc pellentesque sollicitudin. In nunc urna
              bibendum sagittis. Feugiat urna rhoncus tincidunt nulla porta
              ullamcorper pellentesque semper. Aliquam tempus porttitor sit
              lorem. Maecenas id eu sed a tortor fames. Nec viverra nisl nulla
              non.
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
