import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { useRef, useState } from 'react';

import useUser from '@/hooks/useUser';

import Forbidden from '@/components/Forbidden';
import { Header, Layout, Meta } from '@/components/layout';
import Loading from '@/components/Loading';

interface IParams extends ParsedUrlQuery {
  slug: string;
}

const courses = [
  {
    title: 'Welcome!',
    lessons: [
      {
        title: 'Welcome to the CoFoundersLab Startup Accelerator',
        content: '',
        video:
          '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
          '<iframe class="absolute top-0 left-0 w-full h-full" title="vimeo-player" src="https://player.vimeo.com/video/318821587?h=99187f45e3" width="640" height="360" frameBorder="0" allowFullScreen></iframe>' +
          '</div>',
        data: [],
        afterVideo: '',
      },
    ],
  },
  {
    title: 'Program 1 - Overview of the Startup Journey',
    lessons: [
      {
        title: 'The Preparation',
        content:
          "<h1 class='text-2xl text-center font-bold mb-5'>Program 1 - Overview of the Startup Journey</h1><h2 class='text-xl text-center font-medium'>Presented by Erica Duignan Minnihan</h2><p class='text-center'>Erica Duignan Minnihan, CoFounder and managing partner at 1000 Angels, introduces you to the main concepts involved in launching a startup: evaluating your market, choosing a business model, developing an MVP, finding a product/market fit, and more.</p>",
        video: '',
        data: [
          {
            title: '1. It all starts with an idea',
            video:
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="vimeo-player" src="https://player.vimeo.com/video/315330054" width="640" height="360" frameBorder="0" allowFullScreen></iframe>' +
              '</div>',
          },
          {
            title: '2. Do you need a business model?',
            video:
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="vimeo-player" src="https://player.vimeo.com/video/315346025" width="640" height="360" frameBorder="0" allowFullScreen></iframe>' +
              '</div>',
          },
          {
            title:
              '3. Assessing market opportunity and performing competitive analysis',
            video:
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="vimeo-player" src="https://player.vimeo.com/video/315347635" width="640" height="360" frameBorder="0" allowFullScreen></iframe>' +
              '</div>',
          },
          {
            title: '4. What are the various legal structures for business?',
            video:
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="vimeo-player" src="https://player.vimeo.com/video/315365022" width="640" height="360" frameBorder="0" allowFullScreen></iframe>' +
              '</div>',
          },
          {
            title: '5. How to find structure and manage your team',
            video:
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="vimeo-player" src="https://player.vimeo.com/video/315369466" width="640" height="360" frameBorder="0" allowFullScreen></iframe>' +
              '</div>',
          },
        ],
        afterVideo: '',
      },
      {
        title: 'The Plan',
        content:
          "<h1 class='text-2xl text-center font-bold mb-5'>Program 1 - Overview of the Startup Journey</h1>",
        video: '',
        data: [
          {
            title: '1.Do you need to build a Minimum Viable Product (MVP)?',
            video:
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="vimeo-player" src="https://player.vimeo.com/video/324972251" width="640" height="360" frameBorder="0" allowFullScreen></iframe>' +
              '</div>',
          },
          {
            title: '2. Building your startup',
            video:
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="vimeo-player" src="https://player.vimeo.com/video/324977340" width="640" height="360" frameBorder="0" allowFullScreen></iframe>' +
              '</div>',
          },
          {
            title: '3. Building, measuring and learning from your MVP',
            video:
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="vimeo-player" src="https://player.vimeo.com/video/324980211" width="640" height="360" frameBorder="0" allowFullScreen></iframe>' +
              '</div>',
          },
          {
            title: '4. Determining product / market fit',
            video:
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="vimeo-player" src="https://player.vimeo.com/video/315387624" width="640" height="360" frameBorder="0" allowFullScreen></iframe>' +
              '</div>',
          },
          {
            title:
              " 5. Can't find product market fit? How to iterate and pivot",
            video:
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="vimeo-player" src="https://player.vimeo.com/video/315389485" width="640" height="360" frameBorder="0" allowFullScreen></iframe>' +
              '</div>',
          },
        ],
        afterVideo: '',
      },
      {
        title: 'The Takeoff',
        content:
          "<h1 class='text-2xl text-center font-bold mb-5'>Program 1 - Overview of the Startup Journey</h1>",
        video: '',
        data: [
          {
            title: '1. It all starts with an idea',
            video:
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="vimeo-player" src="https://player.vimeo.com/video/324985729" width="640" height="360" frameBorder="0" allowFullScreen></iframe>' +
              '</div>',
          },
          {
            title: '2. Do you need a business model?',
            video:
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="vimeo-player" src="https://player.vimeo.com/video/318454073" width="640" height="360" frameBorder="0" allowFullScreen></iframe>' +
              '</div>',
          },
          {
            title:
              '3. Assessing market opportunity and performing competitive analysis',
            video:
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="vimeo-player" src="https://player.vimeo.com/video/318456539" width="640" height="360" frameBorder="0" allowFullScreen></iframe>' +
              '</div>',
          },
          {
            title: '4. What are the various legal structures for business?',
            video:
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="vimeo-player" src="https://player.vimeo.com/video/318469409" width="640" height="360" frameBorder="0" allowFullScreen></iframe>' +
              '</div>',
          },
          {
            title: '5. How to find structure and manage your team',
            video:
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="vimeo-player" src="https://player.vimeo.com/video/318473718" width="640" height="360" frameBorder="0" allowFullScreen></iframe>' +
              '</div>',
          },
          {
            title: '6. Traction channels: Which ones can work for you?',
            video:
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="vimeo-player" src="https://player.vimeo.com/video/318475373" width="640" height="360" frameBorder="0" allowFullScreen></iframe>' +
              '</div>',
          },
        ],
      },
      {
        title: 'Case Studies',
        content:
          "<h1 class='text-2xl text-center font-bold mb-5'>Program 1 - Overview of the Startup Journey</h1><img src='/assets/images/accelerator/Stash-banner.jpg' alt='stash-banner' />",
        video: '',
        data: [
          {
            title: '',
            video:
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="case-studies" src="http://www.youtube.com/embed/qmsKVTt6--4?modestbranding=1&rel=0&showinfo=0" width="640" height="360" frameBorder="0" allowFullScreen></iframe>' +
              '</div>',
          },
        ],
        afterVideo:
          "<h3 class='mb-2 font-medium font-sans'>Meet David Ronick</h3>" +
          "<p class='pb-3'>NYC based entrepreneur, David Ronick, talks about the start-up journey of his company Stash - an app that helps consumers start investing their money with as little as $5. In this video, Ronick discusses how in 2 years his company has gotten over 300,000 people to open brokerage accounts & have raised over $40 million dollars!</p>" +
          '<hr />' +
          "<h3 class='mb-2 font-medium font-sans mt-5'>The Startup Journey Workbook</h3>" +
          "<a href='https://drive.google.com/open?id=136hmn9if9J2UPb97ZPqKZLyYLyVuUA5F' target='_blank' class='font-medium font-sans text-blue-600'>Download</a>",
      },
      {
        title: 'The Entrepreneur Mindset',
        content:
          "<h1 class='text-2xl text-center font-bold mb-5'>Program 1 - Overview of the Startup Journey</h1>",
        video: '',
        data: [
          {
            title: 'The Entrepreneur Mindset - Steve Lehman',
            video:
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="vimeo-player" src="https://player.vimeo.com/video/305849297" width="640" height="360" frameBorder="0" allowFullScreen></iframe>' +
              '</div>',
          },
        ],
        afterVideo: '',
      },
    ],
  },
  {
    title: 'Program 2 - The Pitch Deck: Business Model Essentials',
    lessons: [
      {
        title: 'Business Plan Essentials',
        content:
          "<h1 class='text-2xl text-center font-bold mb-5'>Program 2 - The Pitch Deck: Business Model Essentials</h1>" +
          "<h2 class='text-xl text-center font-medium'>The Pitch Deck: Business Model Essentials</h2>" +
          "<p class='text-center'>- A CoFoundersLab Masterclass With Joshua Wenner -</p>",
        video: '',
        data: [
          {
            title: '',
            video:
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="vimeo-player" src="https://player.vimeo.com/video/318821344" width="640" height="360" frameBorder="0" allowFullScreen></iframe>' +
              '</div>',
          },
        ],
        afterVideo:
          "<h3 class='mb-2 font-medium font-sans'>Pitch deck template</h3>" +
          "<a href='https://docs.google.com/presentation/d/1UWpC5m94dAVt1heDxW_PmTbhUieoJNi2hiI8MuI3n1U/edit#slide=id.p4' target='_blank' class='font-medium font-sans text-blue-600 mb-2'>Download</a>" +
          '<hr />' +
          "<h3 class='mb-2 font-medium font-sans mt-2'>18 - 24 month plan</h3>" +
          "<a href='https://docs.google.com/document/d/1Yc3IHkzZXTDdMTE_q6f4d_Yg0jNV_0fuK_QFthqD1gU/edit' target='_blank' class='font-medium font-sans text-blue-600 mb-2'>Download</a>" +
          '<hr />' +
          "<h3 class='mb-2 font-medium font-sans mt-2'>Lean Canvas</h3>" +
          "<p class='mb-2 text-gray-600'>Lean Canvas is a framework for understanding a business model. It reveals which piece of the business model is more risky. The purpose of this method is to systematically test your model. The goal is to start experimenting based on the problems and then move into the solution so you’ve figured out the problems before you build it or test it.</p>" +
          "<a href='https://leanstack.com/leancanvas' target='_blank' class='font-medium font-sans text-blue-600'>Download</a>",
      },
    ],
  },
  {
    title:
      'Program 3 - Developing Or Gaining Traction With Your MVP (Minimum Viable Product)',
    lessons: [
      {
        title: 'Your MVP with Tami Reiss, Good 2 Great Product Strategies',
        content:
          "<h1 class='text-2xl text-center font-bold mb-5'>Program 3 - Developing Or Gaining Traction With Your MVP (Minimum Viable Product)</h1>" +
          "<h2 class='text-xl text-center font-medium'>Developing your MVP and lean experiments</h2>",
        video: '',
        data: [
          {
            title: '',
            video:
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="vimeo-player" src="http://www.youtube.com/embed/z_CfvDOP8zs?modestbranding=1&rel=0&showinfo=0" width="640" height="360" frameBorder="0" allowFullScreen></iframe>' +
              '</div>',
          },
        ],
        afterVideo:
          "<p class='mb-2 text-gray-600'>Tami Reiss, of Good 2 Great Product Strategy, discusses product strategy and lean experiments. In this video, you will learn why it is important to have experiments, why we run experiments, what a Minimum Viable Product (MVP) is, the different types of experiments, and more!</p>" +
          '<hr />' +
          "<h3 class='mb-2 font-medium font-sans'>Slides</h3>" +
          "<a href='https://drive.google.com/open?id=14O0oTOljJzFu4bbnviPwl6RRaN3IXbAp' target='_blank' class='font-medium font-sans text-blue-600 mb-2'>Download</a>" +
          '<hr />' +
          "<h3 class='mb-2 font-medium font-sans mt-2'>User Research Guide</h3>" +
          "<a href='https://drive.google.com/open?id=14ZzJdeOwKHn7P6PK21tfPVpg7E0qVGEv' target='_blank' class='font-medium font-sans text-blue-600 mb-2'>Download</a>" +
          '<hr />' +
          "<h3 class='mb-2 font-medium font-sans mt-2'>Sample MVP Build Questionnaire</h3>" +
          "<a href='https://drive.google.com/open?id=14cow8fOwX7sfXQB8NjMSu3zHfvLMi8pD' target='_blank' class='font-medium font-sans text-blue-600 mb-2'>Download</a>" +
          '<hr />' +
          "<h3 class='mb-2 font-medium font-sans mt-2'>Workbook</h3>" +
          "<a href='https://drive.google.com/open?id=139uV4Z-M1jrgw2CrQIhLuxlmwqi36uWM' target='_blank' class='font-medium font-sans text-blue-600'>Download</a>",
      },
      {
        title: 'Gaining Traction with Teju Owoye',
        content:
          "<h1 class='text-2xl text-center font-bold mb-5'>Program 3 - Developing Or Gaining Traction With Your MVP (Minimum Viable Product)</h1>" +
          "<h2 class='text-xl text-center font-medium'>Developing your MVP and lean experiments</h2>",
        video: '',
        data: [
          {
            title: '',
            video:
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="vimeo-player" src="http://www.youtube.com/embed/sgew-G3syJU?modestbranding=1&rel=0&showinfo=0" width="640" height="360" frameBorder="0" allowFullScreen></iframe>' +
              '</div>',
          },
        ],
        afterVideo:
          "<p class='mb-2 text-gray-600'>Teju Owoye, founder and president of the marketing agency Sulte Group, discusses the 6 step process of growth marketing and how to gain traction with your start-up business.</p>" +
          '<hr />' +
          "<h3 class='mb-2 font-medium font-sans'>Slides</h3>" +
          "<a href='https://cdn2.hubspot.net/hubfs/2232636/CFLA/Session%203%20-%20Gaining%20Traction%20with%20Teju%20Owoye.pdf' target='_blank' class='font-medium font-sans text-blue-600 mb-2'>Download</a>" +
          '<hr />' +
          "<h3 class='mb-2 font-medium font-sans mt-2'>Download The Workbook</h3>" +
          "<a href='https://drive.google.com/open?id=13AtqbtmAw7k73iNjehTWWgHYiTIooaNE' target='_blank' class='font-medium font-sans text-blue-600 mb-2'>Download</a>" +
          '<hr />' +
          "<h3 class='mb-2 font-medium font-sans mt-2'>Validate Your Idea Before You Spend $1</h3>" +
          "<a href='https://medium.com/swlh/the-startup-framework-to-validate-your-idea-before-you-spend-1-5c475a3bbd6f' target='_blank' class='font-medium font-sans text-blue-600 mb-2'>Read The Article</a>" +
          '<hr />' +
          "<h3 class='mb-2 font-medium font-sans mt-2'>The Ultimate Marketing Stack for Startups</h3>" +
          "<a href='https://blog.producthunt.com/the-ultimate-marketing-stack-for-startups-ecff2a4e701f' target='_blank' class='font-medium font-sans text-blue-600 mb-2'>Read The Article</a>" +
          '<hr />' +
          "<h3 class='mb-2 font-medium font-sans mt-2'>Dollar Shave Club Case Study</h3>" +
          "<a href='https://pakman.com/dollar-shave-club-how-michael-dubin-created-a-massively-successful-company-and-re-defined-cpg-f2fa700af62b?gi=710496464663' target='_blank' class='font-medium font-sans text-blue-600 mb-2'>Read The Case Study</a>",
      },
    ],
  },
  {
    title: 'Program 4 - Building Your Team',
    lessons: [
      {
        title: '7 Keys To CoFounder Compatibility',
        content:
          "<h1 class='text-2xl text-center font-bold mb-5'>Program 4 - Building Your Team</h1>",
        video: '',
        data: [
          {
            title: '',
            video:
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="youtube-player" src="http://www.youtube.com/embed/MFrt5OMLu0k?modestbranding=1&rel=0&showinfo=0" width="640" height="360" frameBorder="0" allowFullScreen></iframe>' +
              '</div>',
          },
        ],
        afterVideo:
          "<h3 class='mb-2 font-medium font-sans'>Slides</h3>" +
          "<a href='https://drive.google.com/open?id=14ghdVHyXcz73U9XyoZGS9mIaZieGh5da' target='_blank' class='font-medium font-sans text-blue-600 mb-2'>Download</a>" +
          '<hr />' +
          "<h3 class='mb-2 font-medium font-sans mt-2'>The CoFounder Scorecard</h3>" +
          "<a href='https://drive.google.com/open?id=14iuqrfP9dZB3svQfPWFEXrYR84xolQ9x' target='_blank' class='font-medium font-sans text-blue-600 mb-2'>Download</a>" +
          '<hr />' +
          "<h3 class='mb-2 font-medium font-sans mt-2'>The Strategic Advisor Template</h3>" +
          "<a href='https://drive.google.com/open?id=14lPEsxRs0MDCJWDBnMzbzRcycnS-MeEI' target='_blank' class='font-medium font-sans text-blue-600 mb-2'>Read The Article</a>" +
          '<hr />' +
          "<h3 class='mb-2 font-medium font-sans mt-2'>The 7 Keys to CoFounder Compatibility Workbook</h3>" +
          "<a href='https://drive.google.com/open?id=13MbClWgOPoJ7_ql1B0ahQw-6mI5w5nbq' target='_blank' class='font-medium font-sans text-blue-600 mb-2'>Read The Article</a>",
      },
    ],
  },
  {
    title: 'Program 5: Legal: Understanding the Fundamentals',
    lessons: [
      {
        title: 'Intellectual Property and Patents - How To Protect Your Idea',
        content:
          "<h1 class='text-2xl text-center font-bold mb-5'>Program 5: Legal: Understanding the Fundamentals</h1>",
        video: '',
        data: [
          {
            title: '1.Copyrights and trademarks',
            video:
              '<div class="flex flex-col">' +
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="vimeo-player" src="https://player.vimeo.com/video/324994461" width="640" height="360" frameBorder="0" allowFullScreen></iframe></div>' +
              "<h3 class='my-2 font-medium font-sans text-center'>Slides</h3>" +
              "<a href='https://drive.google.com/open?id=13NPzKB-Tn7oEo0xkCKaaY9VV1W-iJIik' target='_blank' class='text-center font-medium font-sans text-blue-600 mb-2'>Download</a></div>",
          },
          {
            title: '2. Why to file a patent and how',
            video:
              '<div class="flex flex-col">' +
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="vimeo-player" src="https://player.vimeo.com/video/324992822" width="640" height="360" frameBorder="0" allowFullScreen></iframe></div>' +
              "<h3 class='my-2 font-medium font-sans text-center'>Slides</h3>" +
              "<a href='https://drive.google.com/open?id=13ZpLeQreoG-gRgKAfJWhjLGfGwzhFl_C' target='_blank' class='text-center font-medium font-sans text-blue-600 mb-2'>Download</a></div>",
          },
          {
            title: '3. The patent process and infringement',
            video:
              '<div class="flex flex-col">' +
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="vimeo-player" src="https://player.vimeo.com/video/324999264" width="640" height="360" frameBorder="0" allowFullScreen></iframe></div>' +
              "<h3 class='my-2 font-medium font-sans text-center'>Slides</h3>" +
              "<a href='https://drive.google.com/open?id=13aB9bYNgMyEW6J_CWO-gV9yIR0FRdHHo' target='_blank' class='text-center font-medium font-sans text-blue-600 mb-2'>Download</a></div>",
          },
          {
            title:
              'Everything you need to know about trademarks and copyrights',
            video:
              '<div class="flex flex-col">' +
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="vimeo-player" src="https://player.vimeo.com/video/318106365" width="640" height="360" frameBorder="0" allowFullScreen></iframe></div>' +
              "<h3 class='my-2 font-medium font-sans text-center'>Slides</h3>" +
              "<a href='https://drive.google.com/open?id=1cRQHGNn0iKhZ1x4Uxjyn_CDwtUvtdFYQ' target='_blank' class='text-center font-medium font-sans text-blue-600 mb-2'>Download</a></div>",
          },
          {
            title: '11 Intellectual Property Tips Every Entrepreneur Must Know',
            video:
              '<div class="flex flex-col">' +
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="vimeo-player" src="https://player.vimeo.com/video/321621307" width="640" height="360" frameBorder="0" allowFullScreen></iframe></div></div>',
          },
        ],
        afterVideo: '',
      },
      {
        title: 'Startup Legal Advice',
        content:
          "<h1 class='text-2xl text-center font-bold mb-5'>Program 5: Legal: Understanding the Fundamentals</h1>" +
          "<h2 class='text-xl text-center font-medium'>Brought To You By Darren Kavinoky</h2>" +
          "<p class='text-center text-gray-600'>Darren Kavinoky is an accomplished trial lawyer, a well-known television host and legal analyst, and a keynote speaker. He is the founder of 1.800.NoCuffs–The Kavinoky Law Firm and is known as an award-winning criminal defense attorney. The American Trial Lawyers Association has named him one of the “Top 100 Trial Lawyers in California” each year since 2007. Los Angeles magazine has identified Darren as a “Super Lawyer” every year since 2010.</p>",
        video: '',
        data: [
          {
            title: 'Darren Kavinoky - Q&A',
            video:
              '<div class="flex flex-col">' +
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="vimeo-player" src="https://player.vimeo.com/video/318528114" width="640" height="360" frameBorder="0" allowFullScreen></iframe></div>' +
              '</div>',
          },
          {
            title: 'Darren Kavinoky - Q&A 2',
            video:
              '<div class="flex flex-col">' +
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="vimeo-player" src="https://player.vimeo.com/video/318510490" width="640" height="360" frameBorder="0" allowFullScreen></iframe></div>' +
              '</div>',
          },
          {
            title: 'Darren Kavinoky - Q&A 3',
            video:
              '<div class="flex flex-col">' +
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="vimeo-player" src="https://player.vimeo.com/video/318510297" width="640" height="360" frameBorder="0" allowFullScreen></iframe></div>' +
              '</div>',
          },
          {
            title: '2. The importance of insurance',
            video:
              '<div class="flex flex-col">' +
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="vimeo-player" src="https://player.vimeo.com/video/318504186" width="640" height="360" frameBorder="0" allowFullScreen></iframe></div>' +
              '</div>',
          },
          {
            title: '3. Employee vs IC',
            video:
              '<div class="flex flex-col">' +
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="vimeo-player" src="https://player.vimeo.com/video/318504370" width="640" height="360" frameBorder="0" allowFullScreen></iframe></div>' +
              '</div>',
          },
          {
            title: '4. Corporation vs LLC',
            video:
              '<div class="flex flex-col">' +
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="vimeo-player" src="https://player.vimeo.com/video/318502861" width="640" height="360" frameBorder="0" allowFullScreen></iframe></div>' +
              '</div>',
          },
          {
            title: '5. Written contract vs oral contract',
            video:
              '<div class="flex flex-col">' +
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="vimeo-player" src="https://player.vimeo.com/video/318502704" width="640" height="360" frameBorder="0" allowFullScreen></iframe></div>' +
              '</div>',
          },
          {
            title: '6. Importance of a trademark',
            video:
              '<div class="flex flex-col">' +
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="vimeo-player" src="https://player.vimeo.com/video/318501287" width="640" height="360" frameBorder="0" allowFullScreen></iframe></div>' +
              '</div>',
          },
        ],
        afterVideo: '',
      },
    ],
  },
  {
    title: 'Program 6: The 6-Month Lean Marketing Plan for Any Startup',
    lessons: [
      {
        title: 'Maximizing Marketing Dollars',
        content:
          "<h1 class='text-2xl text-center font-bold mb-5'>Program 6: The 6-Month Lean Marketing Plan for Any Startup</h1>",
        video: '',
        data: [
          {
            title: 'Who is your customer? Defining consumer personas',
            video:
              '<div class="flex flex-col">' +
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="vimeo-player" src="https://player.vimeo.com/video/322334001" width="640" height="360" frameBorder="0" allowFullScreen></iframe></div>' +
              '</div>',
          },
          {
            title: 'Identifying your consumer persona',
            video:
              '<div class="flex flex-col">' +
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="vimeo-player" src="https://player.vimeo.com/video/322345955" width="640" height="360" frameBorder="0" allowFullScreen></iframe></div>' +
              '</div>',
          },
          {
            title: 'Persona research demonstration',
            video:
              '<div class="flex flex-col">' +
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="vimeo-player" src="https://player.vimeo.com/video/322349502" width="640" height="360" frameBorder="0" allowFullScreen></iframe></div>' +
              '</div>',
          },
          {
            title: 'Budgeting and Google Analytics demonstration',
            video:
              '<div class="flex flex-col">' +
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="vimeo-player" src="https://player.vimeo.com/video/325011547" width="640" height="360" frameBorder="0" allowFullScreen></iframe></div>' +
              '</div>',
          },
        ],
        afterVideo: '',
      },
      {
        title: 'The Lean Marketing Strategy',
        content:
          "<h1 class='text-2xl text-center font-bold mb-5'>Program 6: The 6-Month Lean Marketing Plan for Any Startup</h1>",
        video: '',
        data: [
          {
            title: 'Crafting your lean marketing strategy',
            video:
              '<div class="flex flex-col">' +
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="vimeo-player" src="https://player.vimeo.com/video/322378000" width="640" height="360" frameBorder="0" allowFullScreen></iframe></div>' +
              '</div>',
          },
          {
            title: '8 lean marketing strategies',
            video:
              '<div class="flex flex-col">' +
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="vimeo-player" src="https://player.vimeo.com/video/322356056" width="640" height="360" frameBorder="0" allowFullScreen></iframe></div>' +
              '</div>',
          },
          {
            title: 'Viral loops demo',
            video:
              '<div class="flex flex-col">' +
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="vimeo-player" src="https://player.vimeo.com/video/322359929" width="640" height="360" frameBorder="0" allowFullScreen></iframe></div>' +
              '</div>',
          },
          {
            title: 'Automation and list-building demonstration',
            video:
              '<div class="flex flex-col">' +
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="vimeo-player" src="https://player.vimeo.com/video/322361087" width="640" height="360" frameBorder="0" allowFullScreen></iframe></div>' +
              '</div>',
          },
          {
            title: 'Goal-setting and agile reallocation demonstration',
            video:
              '<div class="flex flex-col">' +
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="vimeo-player" src="https://player.vimeo.com/video/325018472" width="640" height="360" frameBorder="0" allowFullScreen></iframe></div>' +
              '</div>',
          },
        ],
        afterVideo: '',
      },
      {
        title: 'Lean Marketing Workshop',
        content:
          "<h1 class='text-2xl text-center font-bold mb-5'>Program 6: The 6-Month Lean Marketing Plan for Any Startup</h1>",
        video: '',
        data: [
          {
            title: 'Lean marketing case studies',
            video:
              '<div class="flex flex-col">' +
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="vimeo-player" src="https://player.vimeo.com/video/322365032" width="640" height="360" frameBorder="0" allowFullScreen></iframe></div>' +
              '</div>',
          },
          {
            title: 'Buzzsumo demo',
            video:
              '<div class="flex flex-col">' +
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="vimeo-player" src="https://player.vimeo.com/video/322371689" width="640" height="360" frameBorder="0" allowFullScreen></iframe></div>' +
              '</div>',
          },
          {
            title: 'Viral loops demo',
            video:
              '<div class="flex flex-col">' +
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="vimeo-player" src="https://player.vimeo.com/video/322359929" width="640" height="360" frameBorder="0" allowFullScreen></iframe></div>' +
              '</div>',
          },
          {
            title: 'Facebook ads demo',
            video:
              '<div class="flex flex-col">' +
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="vimeo-player" src="https://player.vimeo.com/video/322373699" width="640" height="360" frameBorder="0" allowFullScreen></iframe></div>' +
              '</div>',
          },
          {
            title: 'The guide to long-term marketing',
            video:
              '<div class="flex flex-col">' +
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="vimeo-player" src="https://player.vimeo.com/video/325026705" width="640" height="360" frameBorder="0" allowFullScreen></iframe></div>' +
              '</div>',
          },
        ],
        afterVideo: '',
      },
    ],
  },
  {
    title: 'Program 7 - Financial Projections & Modeling',
    lessons: [
      {
        title: 'Funding Strategies and Financial Modeling',
        content:
          "<h1 class='text-2xl text-center font-bold mb-5'>Program 7 - Financial Projections & Modeling</h1>" +
          "<p class='text-center text-gray-600'>Hosted by Erica Duignan Minnihan, CoFounder and Managing Partner at 1000 Angels</p>",
        video: '',
        data: [
          {
            title: 'Who is your customer? Defining consumer personas',
            video:
              '<div class="flex flex-col">' +
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="vimeo-player" src="https://player.vimeo.com/video/322334001" width="640" height="360" frameBorder="0" allowFullScreen></iframe></div>' +
              '</div>',
          },
        ],
        afterVideo:
          "<p class='mt-5 mb-2 text-center text-gray-600'>Erica Duignan Minnihan, CoFounder and managing partner at 1000 Angels, discusses funding and financial models for the startup business. In this video, you will learn how to determine the amount of money that should be raised and when, why models are important, and what makes a model good.</p>" +
          '<hr />' +
          "<h3 class='my-2 font-medium font-sans'>Slides</h3>" +
          "<a href='https://drive.google.com/open?id=14udz-SWyo3gSwieNJOMuyLOJegurWTRw' target='_blank' class='font-medium font-sans text-blue-600 mb-2'>Download</a>" +
          '<hr />' +
          "<h3 class='my-2 font-medium font-sans'>Workbook</h3>" +
          "<a href='https://drive.google.com/open?id=13eGH3OWubX4v2-s_mpsn88AfoIU2PL0x' target='_blank' class='font-medium font-sans text-blue-600 mb-2'>Download</a>" +
          '<hr />' +
          "<h3 class='my-2 font-medium font-sans'>Simple financial model - 1000 Angels</h3>" +
          "<a href='https://drive.google.com/open?id=14wW20Jb0ISLT1Ol2iHXO8PYWW9kyVAHa' target='_blank' class='font-medium font-sans text-blue-600 mb-2'>Download</a>" +
          '<hr />' +
          "<h3 class='my-2 font-medium font-sans'>Comprehensive sample startup financial model</h3>" +
          "<a href='https://drive.google.com/open?id=153bmCwRz-YU-gLa5AKjPuz0KpuVH34qF' target='_blank' class='font-medium font-sans text-blue-600 mb-2'>Download</a>" +
          '<hr />' +
          "<h3 class='my-2 font-medium font-sans'>Complex sample model - BuzzTable</h3>" +
          "<a href='https://drive.google.com/open?id=14xzVlxziQhCNMu4mwu-75bHzaQdM1LmW' target='_blank' class='font-medium font-sans text-blue-600 mb-2'>Download</a>" +
          '<hr />' +
          "<h3 class='my-2 font-medium font-sans'>Build pro formas like a pro</h3>" +
          "<a href='http://www.startupcfo.ca/2008/04/build-pro-formas-like-a-pro/?utm_campaign=CFLA%20February&utm_source=hs_email&utm_medium=email&_hsenc=p2ANqtz--chDJinkvpmLEfXdiKJvQFxigRO3HwQK0OmvKQdfS5oGG09ZzHC6k18CKqQp1MrI5Utqds' target='_blank' class='font-medium font-sans text-blue-600 mb-2'>Read The Article</a>" +
          '<hr />' +
          "<h3 class='my-2 font-medium font-sans'>Financial Modeling For Startups</h3>" +
          "<a href='https://visible.vc/blog/financial-modeling-for-startups/' target='_blank' class='font-medium font-sans text-blue-600 mb-2'>Read The Article</a>" +
          '<hr />' +
          "<h3 class='my-2 font-medium font-sans'>Zirtual and how they went under</h3>" +
          "<a href='http://fortune.com/2015/08/13/zirtual-maren-kate-donovan-2/' target='_blank' class='font-medium font-sans text-blue-600 mb-2'>Read The Article</a>",
      },
    ],
  },
  {
    title: 'Program 8 - Mastering The Fundraising Game',
    lessons: [
      {
        title: 'Session 1',
        content:
          "<h1 class='text-2xl text-center font-bold mb-5'>Program 8 - Mastering The Fundraising Game</h1>",
        video: '',
        data: [
          {
            title: '1. Introduction to the course',
            video:
              '<div class="flex flex-col">' +
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="vimeo-player" src="https://player.vimeo.com/video/315586889" width="640" height="360" frameBorder="0" allowFullScreen></iframe>' +
              '</div>' +
              "<h3 class='my-2 font-medium font-sans text-center'>Workbook</h3>" +
              "<a href='https://drive.google.com/open?id=13s-usoipPJS2Oxvjr9KxVktiuivA9Z5B' target='_blank' class='text-center font-medium font-sans text-blue-600 mb-2'>Download</a>" +
              '</div>',
          },
          {
            title: '2. Fundraising sources',
            video:
              '<div class="flex flex-col">' +
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="vimeo-player" src="https://player.vimeo.com/video/315587444" width="640" height="360" frameBorder="0" allowFullScreen></iframe></div>' +
              '</div>',
          },
          {
            title: '3. Valuations & investor questions',
            video:
              '<div class="flex flex-col">' +
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="vimeo-player" src="https://player.vimeo.com/video/315590749" width="640" height="360" frameBorder="0" allowFullScreen></iframe></div>' +
              '</div>',
          },
          {
            title: '4. Funding vehicles & share classes',
            video:
              '<div class="flex flex-col">' +
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="vimeo-player" src="https://player.vimeo.com/video/315593230" width="640" height="360" frameBorder="0" allowFullScreen></iframe></div>' +
              '</div>',
          },
          {
            title: '5. How much capital to raise',
            video:
              '<div class="flex flex-col">' +
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="vimeo-player" src="https://player.vimeo.com/video/315594405" width="640" height="360" frameBorder="0" allowFullScreen></iframe></div>' +
              '</div>',
          },
          {
            title: '6. Investor Reactions',
            video:
              '<div class="flex flex-col">' +
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="vimeo-player" src="https://player.vimeo.com/video/320352853" width="640" height="360" frameBorder="0" allowFullScreen></iframe></div>' +
              '</div>',
          },
          {
            title: 'Homework',
            video:
              '<div class="flex flex-col">' +
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="vimeo-player" src="https://player.vimeo.com/video/315595875" width="640" height="360" frameBorder="0" allowFullScreen></iframe></div>' +
              '</div>',
          },
        ],
        afterVideo: '',
      },
      {
        title: 'Session 2',
        content:
          "<h1 class='text-2xl text-center font-bold mb-5'>Program 8 - Mastering The Fundraising Game</h1>",
        video: '',
        data: [
          {
            title: 'Introduction to Session 2',
            video:
              '<div class="flex flex-col">' +
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="vimeo-player" src="https://player.vimeo.com/video/315596496" width="640" height="360" frameBorder="0" allowFullScreen></iframe>' +
              '</div>' +
              "<h3 class='my-2 font-medium font-sans text-center'>Workbook</h3>" +
              "<a href='https://drive.google.com/open?id=13mD5PswgRzdAZYN5V95nGnezqE2fn8x7' target='_blank' class='text-center font-medium font-sans text-blue-600 mb-2'>Download</a>" +
              '</div>',
          },
          {
            title: '1. The funnel of venture capital firms',
            video:
              '<div class="flex flex-col">' +
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="vimeo-player" src="https://player.vimeo.com/video/315596144" width="640" height="360" frameBorder="0" allowFullScreen></iframe></div>' +
              '</div>',
          },
          {
            title: '2. The elevator pitch',
            video:
              '<div class="flex flex-col">' +
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="vimeo-player" src="https://player.vimeo.com/video/315596846" width="640" height="360" frameBorder="0" allowFullScreen></iframe></div>' +
              '</div>',
          },
          {
            title: '3. Introduction to the pitch deck',
            video:
              '<div class="flex flex-col">' +
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="vimeo-player" src="https://player.vimeo.com/video/325068654" width="640" height="360" frameBorder="0" allowFullScreen></iframe></div>' +
              '</div>',
          },
          {
            title: '4. Authenticity and Linguistics During Presentations',
            video:
              '<div class="flex flex-col">' +
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="vimeo-player" src="https://player.vimeo.com/video/315596386" width="640" height="360" frameBorder="0" allowFullScreen></iframe></div>' +
              '</div>',
          },
          {
            title: '5. How to put together the ultimate pitch deck',
            video:
              '<div class="flex flex-col">' +
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="vimeo-player" src="https://player.vimeo.com/video/315597517" width="640" height="360" frameBorder="0" allowFullScreen></iframe></div>' +
              '</div>',
          },
          {
            title: '6. The slides that matter the most',
            video:
              '<div class="flex flex-col">' +
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="vimeo-player" src="https://player.vimeo.com/video/315599200" width="640" height="360" frameBorder="0" allowFullScreen></iframe></div>' +
              '</div>',
          },
          {
            title: '7. The 18th To 24th Month Plan',
            video:
              '<div class="flex flex-col">' +
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="vimeo-player" src="https://player.vimeo.com/video/320516690" width="640" height="360" frameBorder="0" allowFullScreen></iframe></div>' +
              '</div>',
          },
          {
            title: 'Homework',
            video:
              '<div class="flex flex-col">' +
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="vimeo-player" src="https://player.vimeo.com/video/315599578" width="640" height="360" frameBorder="0" allowFullScreen></iframe></div>' +
              '</div>',
          },
        ],
        afterVideo: '',
      },
      {
        title: 'Session 3',
        content:
          "<h1 class='text-2xl text-center font-bold mb-5'>Program 8 - Mastering The Fundraising Game</h1>",
        video: '',
        data: [
          {
            title: '1. Introduction to Session 3',
            video:
              '<div class="flex flex-col">' +
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="vimeo-player" src="https://player.vimeo.com/video/315780206" width="640" height="360" frameBorder="0" allowFullScreen></iframe>' +
              '</div>' +
              "<h3 class='my-2 font-medium font-sans text-center'>Workbook</h3>" +
              "<a href='https://drive.google.com/open?id=13ylRRp-CQh2uGFY2AVc4mkZ73mXjMA9F' target='_blank' class='text-center font-medium font-sans text-blue-600 mb-2'>Download</a>" +
              '</div>',
          },
          {
            title: '2. The due diligence',
            video:
              '<div class="flex flex-col">' +
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="vimeo-player" src="https://player.vimeo.com/video/320521063" width="640" height="360" frameBorder="0" allowFullScreen></iframe></div>' +
              '</div>',
          },
          {
            title: '3. Convertible notes vs. Safe notes',
            video:
              '<div class="flex flex-col">' +
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="vimeo-player" src="https://player.vimeo.com/video/320521656" width="640" height="360" frameBorder="0" allowFullScreen></iframe></div>' +
              '</div>',
          },
          {
            title: '4. Equity rounds',
            video:
              '<div class="flex flex-col">' +
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="vimeo-player" src="https://player.vimeo.com/video/315603026" width="640" height="360" frameBorder="0" allowFullScreen></iframe></div>' +
              '</div>',
          },
          {
            title: '5. Setting up due diligence folders',
            video:
              '<div class="flex flex-col">' +
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="vimeo-player" src="https://player.vimeo.com/video/320522447" width="640" height="360" frameBorder="0" allowFullScreen></iframe></div>' +
              '</div>',
          },
          {
            title: '6. Email outreach & templates for investors',
            video:
              '<div class="flex flex-col">' +
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="vimeo-player" src="https://player.vimeo.com/video/320525257" width="640" height="360" frameBorder="0" allowFullScreen></iframe></div>' +
              '</div>',
          },
          {
            title: '7. Biggest mistakes when fundraising',
            video:
              '<div class="flex flex-col">' +
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="vimeo-player" src="https://player.vimeo.com/video/320525893" width="640" height="360" frameBorder="0" allowFullScreen></iframe></div>' +
              '</div>',
          },
          {
            title: '8. Fundraising tools to increase effectiveness',
            video:
              '<div class="flex flex-col">' +
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="vimeo-player" src="https://player.vimeo.com/video/315605316" width="640" height="360" frameBorder="0" allowFullScreen></iframe></div>' +
              '</div>',
          },
          {
            title: "9. Money is in the bank: What's next?",
            video:
              '<div class="flex flex-col">' +
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="vimeo-player" src="https://player.vimeo.com/video/315605615" width="640" height="360" frameBorder="0" allowFullScreen></iframe></div>' +
              '</div>',
          },
          {
            title: '10. Recap & things to avoid',
            video:
              '<div class="flex flex-col">' +
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="vimeo-player" src="https://player.vimeo.com/video/315606175" width="640" height="360" frameBorder="0" allowFullScreen></iframe></div>' +
              '</div>',
          },
          {
            title: '11. Making the investors feel privileged',
            video:
              '<div class="flex flex-col">' +
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="vimeo-player" src="https://player.vimeo.com/video/320526465" width="640" height="360" frameBorder="0" allowFullScreen></iframe></div>' +
              '</div>',
          },
          {
            title: '12. Good luck!',
            video:
              '<div class="flex flex-col">' +
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="vimeo-player" src="https://player.vimeo.com/video/320526725" width="640" height="360" frameBorder="0" allowFullScreen></iframe></div>' +
              '</div>',
          },
        ],
        afterVideo: '',
      },
      {
        title: 'Resources',
        content:
          "<h1 class='text-2xl text-center font-bold mb-5'>Program 8 - Mastering The Fundraising Game</h1>",
        video: '',
        data: [],
        afterVideo:
          "<h3 class='my-2 font-medium font-sans'>Elevator Pitch Template</h3>" +
          "<a href='https://docs.google.com/document/d/1_XdisxrarbH4VQRFUp_BvdntOBeOHpJTPgMFZm5KM3Y/edit' target='_blank' class='font-medium font-sans text-blue-600 mb-2'>Download</a>" +
          '<hr />' +
          "<h3 class='my-2 font-medium font-sans'>Workbook for Session 1</h3>" +
          "<a href='https://drive.google.com/open?id=13s-usoipPJS2Oxvjr9KxVktiuivA9Z5B' target='_blank' class='font-medium font-sans text-blue-600 mb-2'>Download</a>" +
          '<hr />' +
          "<h3 class='my-2 font-medium font-sans'>Workbook for Session 2</h3>" +
          "<a href='https://drive.google.com/open?id=13mD5PswgRzdAZYN5V95nGnezqE2fn8x7' target='_blank' class='font-medium font-sans text-blue-600 mb-2'>Download</a>" +
          '<hr />' +
          "<h3 class='my-2 font-medium font-sans'>Workbook for Session 3</h3>" +
          "<a href='https://drive.google.com/open?id=13ylRRp-CQh2uGFY2AVc4mkZ73mXjMA9F' target='_blank' class='font-medium font-sans text-blue-600 mb-2'>Download</a>",
      },
      {
        title: 'Investor Panel',
        content:
          "<h1 class='text-2xl text-center font-bold mb-5'>Program 8 - Mastering The Fundraising Game</h1>" +
          "<h2 class='text-xl text-center font-bold mb-5'>Investor Panel: Everything you need to know to get funded</h2>" +
          "<p class='text-center text-gray-600'> With Steve Lehman, Erica Duignan Minnihan, and Steven McClurg</p>",
        video: '',
        data: [
          {
            title: '',
            video:
              '<div class="flex flex-col">' +
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="vimeo-player" src="http://www.youtube.com/embed/4Md-1wBKZkw?modestbranding=1&rel=0&showinfo=0" width="640" height="360" frameBorder="0" allowFullScreen></iframe></div>' +
              '</div>',
          },
        ],
        afterVideo:
          "<h2 class='text-center text-2xl font-bold font-serif'>Brought to you by;</h2>" +
          "<div class='flex flex-row flex-1 mt-5'>" +
          "<div class='w-[50%] flex justify-center'><img src='/assets/images/accelerator/steve-3.png' class='w-[200px] rounded-full' alt='Image' /></div>" +
          "<div class='w-[50%] flex flex-col justify-center'>" +
          "<p class='text-semibold text-gray-700 font-sans font-semibold'>Steve Lehman</p>" +
          "<p class='text-semibold text-gray-700 font-sans font-base italic mb-3'>Chairman, Business Rockstars</p>" +
          "<p class='text-semibold text-gray-700 font-sans font-base'>A successful serial entrepreneur and investor, with an extensive financial and business background. He has been CEO of both NASDAQ and NYSE companies and a first round investor in Mark Cuban’s Broadcast.com</p>" +
          '</div>' +
          '</div>' +
          "<div class='flex flex-row flex-1 mt-5'>" +
          "<div class='w-[50%] flex justify-center'><img src='/assets/images/accelerator/erica-circle.png' class='w-[200px] rounded-full' alt='Image' /></div>" +
          "<div class='w-[50%] flex flex-col justify-center'>" +
          "<p class='text-semibold text-gray-700 font-sans font-semibold'>Erica Duignan Minnihan</p>" +
          "<p class='text-semibold text-gray-700 font-sans font-base italic mb-3'>Managing Partner at 1000 Angels</p>" +
          "<p class='text-semibold text-gray-700 font-sans font-base'>1000 Angels is a private digital venture investment network that provides a platform for high net worth individuals, family offices, and Venture Funds to make direct investments in a curated selection of high-growth, early-stage investment opportunities.</p>" +
          '</div>' +
          '</div>' +
          "<div class='flex flex-row flex-1 mt-5 mb-5'>" +
          "<div class='w-[50%] flex justify-center'><img src='/assets/images/accelerator/Steven-2.png' class='w-[200px] rounded-full' alt='Image' /></div>" +
          "<div class='w-[50%] flex flex-col justify-center'>" +
          "<p class='text-semibold text-gray-700 font-sans font-semibold'>Steven McClurg</p>" +
          "<p class='text-semibold text-gray-700 font-sans font-base italic mb-3'>Chief Investment Officer at Arca Funds</p>" +
          "<p class='text-semibold text-gray-700 font-sans font-base'>Former Managing Director at Guggenheim Partners where he helped oversee $120 Billion in mutual and index fund AUM. Prior roles and experience include private equity, financial & operational management and corporate development in the tech sector.</p>" +
          '</div>' +
          '</div>' +
          '' +
          "<h3 class='mt-5 mb-2 font-medium font-sans'>SAFE Financing Documents</h3>" +
          "<a href='https://500.co/kiss/' target='_blank' class='font-medium font-sans text-blue-600 mb-2'>Download</a>" +
          '<hr />' +
          "<h3 class='my-2 font-medium font-sans'>KISS Notes</h3>" +
          "<a href='https://500.co/kiss/' target='_blank' class='font-medium font-sans text-blue-600 mb-2'>Download</a>" +
          '<hr />' +
          "<h3 class='my-2 font-medium font-sans'>Workbook</h3>" +
          "<a href='https://drive.google.com/open?id=148P5-A6QsHrjU5Vtv8_RhsriNI2YNmPC' target='_blank' class='font-medium font-sans text-blue-600 mb-2'>Download</a>",
      },
    ],
  },
  {
    title: 'Program 9: Mastering The Fundraising Game Part II',
    lessons: [
      {
        title: 'Advanced Fundraising',
        content:
          "<h1 class='text-2xl text-center font-bold mb-5'>Program 9: Mastering The Fundraising Game Part II</h1>" +
          "<p class='mb-3'>We will be covering:</p>" +
          '<ul>' +
          '<li class="flex mb-2"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-4 flex-shrink" fill="none" viewBox="0 0 24 24" stroke="currentColor">' +
          '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />' +
          '</svg><span class="flex-grow">​Economic terms of the term sheet</span></li>' +
          '<li class="flex mb-2"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-4 flex-shrink" fill="none" viewBox="0 0 24 24" stroke="currentColor">' +
          '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />' +
          '</svg><span class="flex-grow">​Techniques to establishing your valuation</span></li>' +
          '<li class="flex mb-2"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-4 flex-shrink" fill="none" viewBox="0 0 24 24" stroke="currentColor">' +
          '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />' +
          '</svg><span class="flex-grow">​Fundraising case studies by stages</span></li>' +
          '<li class="flex mb-2"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-4 flex-shrink" fill="none" viewBox="0 0 24 24" stroke="currentColor">' +
          '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />' +
          '</svg><span class="flex-grow">​Board structures and corporate governance of the board</span></li>' +
          '<li class="flex mb-2"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-4 flex-shrink" fill="none" viewBox="0 0 24 24" stroke="currentColor">' +
          '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />' +
          '</svg><span class="flex-grow">​Best practices on updating investors</span></li>' +
          '<li class="flex mb-2"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-4 flex-shrink" fill="none" viewBox="0 0 24 24" stroke="currentColor">' +
          '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />' +
          '</svg><span class="flex-grow">​Beyond the first raise</span></li>' +
          '<li class="flex mb-2"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-4 flex-shrink" fill="none" viewBox="0 0 24 24" stroke="currentColor">' +
          '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />' +
          '</svg><span class="flex-grow">Managing to get an exit opportunity</span></li>' +
          '<li class="flex mb-2"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-4 flex-shrink" fill="none" viewBox="0 0 24 24" stroke="currentColor">' +
          '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />' +
          '</svg><span class="flex-grow">And more​</span></li>' +
          '</ul>',
        video: '',
        data: [
          {
            title: '1. During the financing round',
            video:
              '<div class="flex flex-col">' +
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="vimeo-player" src="https://player.vimeo.com/video/318332015" width="640" height="360" frameBorder="0" allowFullScreen></iframe>' +
              '</div>' +
              "<h3 class='my-2 font-medium font-sans text-center'>Workbook</h3>" +
              "<a href='https://drive.google.com/open?id=14H1pKnOElWTt6wNBnicu8sSyXKUUwZiZ' target='_blank' class='text-center font-medium font-sans text-blue-600 mb-2'>Download</a>" +
              '</div>',
          },
          {
            title: '2. Post financing round',
            video:
              '<div class="flex flex-col">' +
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="vimeo-player" src="https://player.vimeo.com/video/318332594" width="640" height="360" frameBorder="0" allowFullScreen></iframe>' +
              '</div>' +
              "<h3 class='my-2 font-medium font-sans text-center'>Workbook</h3>" +
              "<a href='https://drive.google.com/open?id=14I7bW9IpWL-Iyu_vYDd6YhEE6UgUdsEC' target='_blank' class='text-center font-medium font-sans text-blue-600 mb-2'>Download</a>" +
              '</div>',
          },
          {
            title: '3. Follow on financing & beyond',
            video:
              '<div class="flex flex-col">' +
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="vimeo-player" src="https://player.vimeo.com/video/318333281" width="640" height="360" frameBorder="0" allowFullScreen></iframe>' +
              '</div>' +
              "<h3 class='my-2 font-medium font-sans text-center'>Workbook</h3>" +
              "<a href='https://drive.google.com/open?id=14KlU24Ikpc82rDuTE4ovDwJFsYYl6Kvl' target='_blank' class='text-center font-medium font-sans text-blue-600 mb-2'>Download</a>" +
              '</div>',
          },
        ],
        afterVideo: '',
      },
    ],
  },
  {
    title: 'Program 10: Preparing For Your Pitch',
    lessons: [
      {
        title: 'The Perfect Pitch Deck Masterclass',
        content:
          "<h1 class='text-2xl text-center font-bold mb-5'>Program 10: Preparing For Your Pitch</h1>",
        video: '',
        data: [
          {
            title: 'The Perfect Pitch Deck masterclass with Steve Lehman',
            video:
              '<div class="flex flex-col">' +
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="vimeo-player" src="https://player.vimeo.com/video/318482210" width="640" height="360" frameBorder="0" allowFullScreen></iframe></div>' +
              '</div>',
          },
        ],
        afterVideo:
          '<h3 class="mt-5 mb-2 font-bold text-center font-sans">Resources</h3>' +
          '<hr />' +
          "<h3 class='mt-5 mb-2 font-medium font-sans'>The Pitch Deck template</h3>" +
          "<a href='https://docs.google.com/presentation/d/1UWpC5m94dAVt1heDxW_PmTbhUieoJNi2hiI8MuI3n1U/edit#slide=id.p4' target='_blank' class='font-medium font-sans text-blue-600 mb-2'>Download</a>" +
          '<hr />' +
          "<h3 class='mt-5 mb-2 font-medium font-sans'>Format and Basics of a Killer Pitch Deck</h3>" +
          "<a href='https://drive.google.com/open?id=15DCXt8PRi3_RPJQGdvN6PlBpQjiE1l-9' target='_blank' class='font-medium font-sans text-blue-600 mb-2'>Download</a>",
      },
      {
        title: 'Investor Presentations: Creating The Perfect Pitch',
        content:
          "<h1 class='text-2xl text-center font-bold mb-5'>Program 10: Preparing For Your Pitch</h1>",
        video: '',
        data: [
          {
            title: 'Investor presentations: creating the perfect pitch',
            video:
              '<div class="flex flex-col">' +
              '<p class="text-center text-gray-600 mb-5">With Jose Caya, Founder and CEO of Slidebean</p>' +
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" class="self-center" title="youtube-player" src="http://www.youtube.com/embed/Y9UEHn-I4a4?modestbranding=1&rel=0&showinfo=0" width="640" height="360" frameBorder="0" allowFullScreen></iframe>' +
              '</div>' +
              '<p class="text-center mt-5 text-gray-600">Jose Caya, founder and CEO of Slidebean, shares with us how to make a pitch deck that actually gets you funded.</p>' +
              '</div>',
          },
        ],
        afterVideo:
          '<h3 class="mt-5 mb-2 font-bold text-center font-sans">Additional Information</h3>' +
          '<hr />' +
          "<h3 class='mt-5 mb-2 font-medium font-sans'>Slides</h3>" +
          "<a href='https://app.slidebean.com/p/5tNEYwyKaI/A-Pitch-Deck-that-Actually-Gets-you-Funded' target='_blank' class='font-medium font-sans text-blue-600 mb-2'>View</a>",
      },
      {
        title: 'Pitch Practice Review',
        content:
          "<h1 class='text-2xl text-center font-bold mb-5'>Program 10: Preparing For Your Pitch</h1>",
        video: '',
        data: [
          {
            title: 'Pitch Practice Session:',
            video:
              '<div class="flex flex-col">' +
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="youtube-player" src="http://www.youtube.com/embed/207bgtQ0IfY?modestbranding=1&rel=0&showinfo=0" width="640" height="360" frameBorder="0" allowFullScreen></iframe></div>' +
              '</div>',
          },
          {
            title: 'Virtual Demo Day',
            video:
              '<div class="flex flex-col">' +
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="youtube-player" src="http://www.youtube.com/embed/FCSua37kIns?modestbranding=1&rel=0&showinfo=0" width="640" height="360" frameBorder="0" allowFullScreen></iframe></div>' +
              '</div>',
          },
          {
            title: 'Virtual Demo Day 2',
            video:
              '<div class="flex flex-col">' +
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="youtube-player" src="http://www.youtube.com/embed/2G1LjT5GcIU?modestbranding=1&rel=0&showinfo=0" width="640" height="360" frameBorder="0" allowFullScreen></iframe></div>' +
              '</div>',
          },
        ],
        afterVideo:
          '<h3 class="text-xl font-bold text-center">Want The Opportunity to Pitch Your Idea?</h3>' +
          '<a class="py-2 px-5 bg-blue-600 inline-block max-w-sm mx-auto text-white mt-5" href="https://docs.google.com/forms/d/e/1FAIpQLSfk2n661HctQyOaXa4lGl3_YaVxYy5wt3kLmuw57lKsAJMdJw/viewform" target="_blank">Click To Submit Here!</a>',
      },
    ],
  },
  {
    title: 'Additional Materials',
    lessons: [
      {
        title: 'Additional Materials',
        content:
          "<h1 class='text-2xl text-center font-bold mb-5'>Additional Materials</h1>",
        video: '',
        data: [],
        afterVideo:
          '<hr />' +
          "<a href='https://drive.google.com/open?id=14lPEsxRs0MDCJWDBnMzbzRcycnS-MeEI' target='_blank' class='font-medium font-sans text-blue-600 my-3'>Strategic Advisor Agreement template</a>" +
          '<hr />' +
          "<a href='https://seedlawyers.com/landing?partnership=cofounderslab' target='_blank' class='font-medium font-sans text-blue-600 my-3'>SeedLawyers: 150 credits to use for answers to legal questions</a>" +
          '<hr />' +
          "<a href='https://docs.google.com/presentation/d/1UWpC5m94dAVt1heDxW_PmTbhUieoJNi2hiI8MuI3n1U/edit#slide=id.p4' target='_blank' class='font-medium font-sans text-blue-600 my-3'>Pitch Deck template (to save go to File and Download as)  </a>" +
          '<hr />' +
          "<a href='https://www.ycombinator.com/documents/' target='_blank' class='font-medium font-sans text-blue-600 my-3'>Safe Notes</a>" +
          '<hr />' +
          "<a href='https://500.co/kiss/' target='_blank' class='font-medium font-sans text-blue-600 my-3'>KISS Notes</a>" +
          '<hr />' +
          "<a href='https://drive.google.com/open?id=14iuqrfP9dZB3svQfPWFEXrYR84xolQ9x' target='_blank' class='font-medium font-sans text-blue-600 my-3'>CoFounder Scorecard</a>" +
          '<hr />' +
          "<a href='https://drive.google.com/open?id=15DCXt8PRi3_RPJQGdvN6PlBpQjiE1l-9' target='_blank' class='font-medium font-sans text-blue-600 my-3'>Format and Basics of a Killer Pitch Deck</a>" +
          '<hr />' +
          "<a href='https://drive.google.com/open?id=15GpY3UocF_Mxo2zXsIY7paVBD3urTMgU' target='_blank' class='font-medium font-sans text-blue-600 my-3'>Cracking The Investor Code</a>" +
          '<hr />' +
          "<a href='https://drive.google.com/open?id=15KXbI-084p9ZfgMXWspe1QQ1GNKYC6OQ' target='_blank' class='font-medium font-sans text-blue-600 my-3'>6 Mindset Hacks</a>" +
          '<hr />' +
          "<a href='https://www.thisisgoingtobebig.com/blog/2016/12/4/how-to-perform-inception-on-a-vc' target='_blank' class='font-medium font-sans text-blue-600 my-3'>How to Perform Inception on a VC</a>" +
          '<hr />' +
          "<a href='https://www.forbes.com/sites/chancebarnett/2014/05/09/investor-pitch-deck-to-raise-money-for-startups/' target='_blank' class='font-medium font-sans text-blue-600 my-3'>The Ultimate Pitch Deck to Raise Money for Startups</a>",
      },
    ],
  },
  {
    title: 'Mentor Interviews',
    lessons: [
      {
        title: 'Rodney Williams, Founder and Executive Chairman of LISNR',
        content:
          "<h1 class='text-2xl text-center font-bold mb-5'>Mentor Interviews</h1>",
        video: '',
        data: [
          {
            title: '',
            video:
              '<div class="flex flex-col">' +
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="youtube-player" src="http://www.youtube.com/embed/TrUVHkAw3Ro?modestbranding=1&rel=0&showinfo=0" width="640" height="360" frameBorder="0" allowFullScreen></iframe></div>' +
              '</div>',
          },
        ],
        afterVideo: '',
      },
      {
        title: 'Michael Goldstein, Bridge International Academies',
        content:
          "<h1 class='text-2xl text-center font-bold mb-5'>Mentor Interviews</h1>",
        video: '',
        data: [
          {
            title: '',
            video:
              '<div class="flex flex-col">' +
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="youtube-player" src="http://www.youtube.com/embed/iwp4As-jWrI?modestbranding=1&rel=0&showinfo=0" width="640" height="360" frameBorder="0" allowFullScreen></iframe></div>' +
              '</div>',
          },
        ],
        afterVideo: '',
      },
      {
        title: 'Nina Vaca, CEO, Chairman and Founder of Pinnacle Group',
        content:
          "<h1 class='text-2xl text-center font-bold mb-5'>Mentor Interviews</h1>",
        video: '',
        data: [
          {
            title: '',
            video:
              '<div class="flex flex-col">' +
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="youtube-player" src="http://www.youtube.com/embed/aFFrsfK_xFU?modestbranding=1&rel=0&showinfo=0" width="640" height="360" frameBorder="0" allowFullScreen></iframe></div>' +
              '</div>',
          },
        ],
        afterVideo: '',
      },
      {
        title: 'Jake Lodwick, Vimeo',
        content:
          "<h1 class='text-2xl text-center font-bold mb-5'>Mentor Interviews</h1>",
        video: '',
        data: [
          {
            title: '',
            video:
              '<div class="flex flex-col">' +
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="youtube-player" src="http://www.youtube.com/embed/4eDw8x26ynE?modestbranding=1&rel=0&showinfo=0" width="640" height="360" frameBorder="0" allowFullScreen></iframe></div>' +
              '</div>',
          },
        ],
        afterVideo: '',
      },
      {
        title: 'Josh Jantsch, Duct Tape Marketing',
        content:
          "<h1 class='text-2xl text-center font-bold mb-5'>Mentor Interviews</h1>",
        video: '',
        data: [
          {
            title: '',
            video:
              '<div class="flex flex-col">' +
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="youtube-player" src="http://www.youtube.com/embed/GdDhhYdx4Ys?modestbranding=1&rel=0&showinfo=0" width="640" height="360" frameBorder="0" allowFullScreen></iframe></div>' +
              '</div>',
          },
        ],
        afterVideo: '',
      },
      {
        title: 'David Meerman Scott, Marketing Expert and Founder of Freshspot',
        content:
          "<h1 class='text-2xl text-center font-bold mb-5'>Mentor Interviews</h1>",
        video: '',
        data: [
          {
            title: '',
            video:
              '<div class="flex flex-col">' +
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="youtube-player" src="http://www.youtube.com/embed/jPE81TsT4ew?modestbranding=1&rel=0&showinfo=0" width="640" height="360" frameBorder="0" allowFullScreen></iframe></div>' +
              '</div>',
          },
        ],
        afterVideo: '',
      },
      {
        title:
          'Paul Appelbaum, CoFounder of GrubHub Seamless, Early Stage Investor and Advisor',
        content:
          "<h1 class='text-2xl text-center font-bold mb-5'>Mentor Interviews</h1>",
        video: '',
        data: [
          {
            title: '',
            video:
              '<div class="flex flex-col">' +
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="youtube-player" src="http://www.youtube.com/embed/2VRzlcuEEu4?modestbranding=1&rel=0&showinfo=0" width="640" height="360" frameBorder="0" allowFullScreen></iframe></div>' +
              '</div>',
          },
        ],
        afterVideo: '',
      },
      {
        title:
          "Scott Hudler, Senior Vice-President / Chief Marketing Officer of DICK's Sporting Goods",
        content:
          "<h1 class='text-2xl text-center font-bold mb-5'>Mentor Interviews</h1>",
        video: '',
        data: [
          {
            title: '',
            video:
              '<div class="flex flex-col">' +
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="youtube-player" src="http://www.youtube.com/embed/bsUSDRzi4b4?modestbranding=1&rel=0&showinfo=0" width="640" height="360" frameBorder="0" allowFullScreen></iframe></div>' +
              '</div>',
          },
        ],
        afterVideo: '',
      },
      {
        title: 'Miki Agrawal, THINX',
        content:
          "<h1 class='text-2xl text-center font-bold mb-5'>Mentor Interviews</h1>",
        video: '',
        data: [
          {
            title: '',
            video:
              '<div class="flex flex-col">' +
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="youtube-player" src="http://www.youtube.com/embed/IN7N_b2YzWc?modestbranding=1&rel=0&showinfo=0" width="640" height="360" frameBorder="0" allowFullScreen></iframe></div>' +
              '</div>',
          },
        ],
        afterVideo: '',
      },
      {
        title: 'Chinedu Echeruo, GigaMeet',
        content:
          "<h1 class='text-2xl text-center font-bold mb-5'>Mentor Interviews</h1>",
        video: '',
        data: [
          {
            title: '',
            video:
              '<div class="flex flex-col">' +
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="youtube-player" src="http://www.youtube.com/embed/ColO5VaRUxg?modestbranding=1&rel=0&showinfo=0" width="640" height="360" frameBorder="0" allowFullScreen></iframe></div>' +
              '</div>',
          },
        ],
        afterVideo: '',
      },
      {
        title: 'Sharmeen Mitha, CEO & Founder at Appy Couple',
        content:
          "<h1 class='text-2xl text-center font-bold mb-5'>Mentor Interviews</h1>",
        video: '',
        data: [
          {
            title: '',
            video:
              '<div class="flex flex-col">' +
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="youtube-player" src="http://www.youtube.com/embed/zlS0a-buOYc?modestbranding=1&rel=0&showinfo=0" width="640" height="360" frameBorder="0" allowFullScreen></iframe></div>' +
              '</div>',
          },
        ],
        afterVideo: '',
      },
      {
        title: "Tanya Menendez, Maker's Row",
        content:
          "<h1 class='text-2xl text-center font-bold mb-5'>Mentor Interviews</h1>",
        video: '',
        data: [
          {
            title: '',
            video:
              '<div class="flex flex-col">' +
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="youtube-player" src="http://www.youtube.com/embed/s4u0NFnkB1U?modestbranding=1&rel=0&showinfo=0" width="640" height="360" frameBorder="0" allowFullScreen></iframe></div>' +
              '</div>',
          },
        ],
        afterVideo: '',
      },
      {
        title: 'Murat Aktihanoglu, ERA',
        content:
          "<h1 class='text-2xl text-center font-bold mb-5'>Mentor Interviews</h1>",
        video: '',
        data: [
          {
            title: '',
            video:
              '<div class="flex flex-col">' +
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="youtube-player" src="http://www.youtube.com/embed/1AUPGnHg4XY?modestbranding=1&rel=0&showinfo=0" width="640" height="360" frameBorder="0" allowFullScreen></iframe></div>' +
              '</div>',
          },
        ],
        afterVideo: '',
      },
      {
        title: 'Frank Gruber, Tech.co',
        content:
          "<h1 class='text-2xl text-center font-bold mb-5'>Mentor Interviews</h1>",
        video: '',
        data: [
          {
            title: '',
            video:
              '<div class="flex flex-col">' +
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="youtube-player" src="http://www.youtube.com/embed/eiMqzCsWFCY?modestbranding=1&rel=0&showinfo=0" width="640" height="360" frameBorder="0" allowFullScreen></iframe></div>' +
              '</div>',
          },
        ],
        afterVideo: '',
      },
      {
        title: 'David Olk, CoFounder of ShopKeep and Voray',
        content:
          "<h1 class='text-2xl text-center font-bold mb-5'>Mentor Interviews</h1>",
        video: '',
        data: [
          {
            title: '',
            video:
              '<div class="flex flex-col">' +
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="youtube-player" src="http://www.youtube.com/embed/a7X4GKO9fIY?modestbranding=1&rel=0&showinfo=0" width="640" height="360" frameBorder="0" allowFullScreen></iframe></div>' +
              '</div>',
          },
        ],
        afterVideo: '',
      },
      {
        title: 'Alicia Syrett, Founder & CEO of Pantegrion',
        content:
          "<h1 class='text-2xl text-center font-bold mb-5'>Mentor Interviews</h1>",
        video: '',
        data: [
          {
            title: '',
            video:
              '<div class="flex flex-col">' +
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="youtube-player" src="http://www.youtube.com/embed/RZ12TqHkPoc?modestbranding=1&rel=0&showinfo=0" width="640" height="360" frameBorder="0" allowFullScreen></iframe></div>' +
              '</div>',
          },
        ],
        afterVideo: '',
      },
      {
        title: 'Devaraj Southworth, Thirstie',
        content:
          "<h1 class='text-2xl text-center font-bold mb-5'>Mentor Interviews</h1>",
        video: '',
        data: [
          {
            title: '',
            video:
              '<div class="flex flex-col">' +
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="youtube-player" src="http://www.youtube.com/embed/9p5Cgkeh_Ho?modestbranding=1&rel=0&showinfo=0" width="640" height="360" frameBorder="0" allowFullScreen></iframe></div>' +
              '</div>',
          },
        ],
        afterVideo: '',
      },
      {
        title: 'Will Young, VTF Capital',
        content:
          "<h1 class='text-2xl text-center font-bold mb-5'>Mentor Interviews</h1>",
        video: '',
        data: [
          {
            title: '',
            video:
              '<div class="flex flex-col">' +
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="youtube-player" src="http://www.youtube.com/embed/K2scbar48Us?modestbranding=1&rel=0&showinfo=0" width="640" height="360" frameBorder="0" allowFullScreen></iframe></div>' +
              '</div>',
          },
        ],
        afterVideo: '',
      },
      {
        title: 'Kat Cole, COO and President, North America at FOCUS Brands',
        content:
          "<h1 class='text-2xl text-center font-bold mb-5'>Mentor Interviews</h1>",
        video: '',
        data: [
          {
            title: '',
            video:
              '<div class="flex flex-col">' +
              '<div class="relative h-0 overflow-hidden max-w-full w-full" style="padding-bottom: 56.25%">' +
              '<iframe class="absolute top-0 left-0 w-full h-full" title="youtube-player" src="http://www.youtube.com/embed/lghbtTbBqok?modestbranding=1&rel=0&showinfo=0" width="640" height="360" frameBorder="0" allowFullScreen></iframe></div>' +
              '</div>',
          },
        ],
        afterVideo: '',
      },
    ],
  },
  // ,{
  //   title: "Weekly Coaching Goals",
  //   lessons: [{
  //     title : "Upcoming Q&A Calls Schedule",
  //     content : "<h1 class='text-2xl text-center font-bold mb-5'>Weekly Coaching Goals</h1>",
  //     video:"",
  //     data : [],
  //     afterVideo:"<h2 class='text-center text-2xl font-semibold text-gray-900'>How To Join</h2>"
  //       +'<br />'
  //       +'<div class="text-center text-gray-600">Please use the link below to access the live webinar at the scheduled time.</div>'
  //       +'<div class="text-center text-2xl mt-5">Join Here - <a class="cursor-pointer text-blue-600" href="https://zoom.us/j/9140397888" target="_blank">https://zoom.us/j/9140397888</a></div>'
  //   },{
  //     title : "Perfect Pitch Practice",
  //     content : "<h1 class='text-2xl text-center font-bold mb-5'>Weekly Coaching Goals</h1>",
  //     video:"",
  //     data : [],
  //     afterVideo:"<h2 class='text-center text-2xl font-semibold text-gray-900'>How To Join</h2>"
  //     +'<br />'
  //     +'<div class="text-center text-gray-600">Please use the link below to access the live call at the scheduled time.</div>'
  //     +'<div class="text-center text-2xl mt-5">Join Here - <a class="cursor-pointer text-blue-600" href="https://zoom.us/j/9140397888" target="_blank">https://zoom.us/j/9140397888</a></a></div>'
  //   }],
  // }
];

const Accord = ({ course, content, handleClick }: any) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <h2
        className="relative mb-2 mr-2 cursor-pointer pr-5 text-base"
        onClick={() => {
          setOpen(!open);
        }}
      >
        {course.title}
        <span className="absolute right-0 top-0">
          {!open ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 15l7-7 7 7"
              />
            </svg>
          )}
        </span>
      </h2>
      {course?.lessons.map((chapter: any, j: number) => {
        return (
          <div className={'chapter_' + (j + 1)} key={'chapter_' + (j + 1)}>
            <h2
              className={
                chapter.title == content.title
                  ? !open
                    ? 'hidden '
                    : '' +
                      'font-base cursor-pointer p-2 text-base text-blue-600'
                  : !open
                  ? 'hidden '
                  : '' +
                    'cursor-pointer p-2 text-base font-normal hover:text-blue-500'
              }
              onClick={() => {
                handleClick(chapter);
              }}
            >
              {chapter.title}
            </h2>
          </div>
        );
      })}
    </>
  );
};

export default function CoursePage() {
  const router = useRouter();
  const { user, loggedOut } = useUser();
  const [content, setContent] = useState<any>({});
  const leftRef = useRef();

  if (user?.role?.type != 'premium') {
    return <Forbidden />;
  }

  const watchVideo = (e: any) => {
    e.preventDefault();
    const href = e.target.href || '#';
    router.push(href);
  };

  const handleContent = (chapter: any) => {
    setContent(chapter);
  };

  if (leftRef.current !== undefined) {
    console.log(leftRef);
  }

  if (!courses) return <Loading />;

  const acceleratorCourses = () => {
    return (
      <div className="relative overflow-hidden">
        {/* <div className="absolute left-0 right-[70%] bg-gray-200 md:h-[100%]"></div> */}
        <div
          className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8"
          style={{ zIndex: 1, position: 'relative' }}
        >
          <div className="flex flex-col md:flex-row">
            <div className="max-h-auto order-2 flex-shrink-0 p-1 pt-5 md:order-1 md:max-h-[800px] md:w-1/3 md:overflow-y-scroll md:pt-0">
              <div className="mt-10"></div>
              {/* <a href="/accelerator" onClick={watchVideo} className="font-medium text-white bg-blue-600 hover:bg-blue:700 p-1 px-4 mr-5 rounded"> */}
              <div className="flex gap-5">
                <a
                  href="/accelerator"
                  onClick={watchVideo}
                  className="leadind-0 inline-block flex items-center rounded-md bg-blue-600 p-2 px-5 font-bold text-white hover:bg-blue-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                </a>
                <a
                  href="https://cofounderslab.slack.com/"
                  onClick={watchVideo}
                  className="inline-block flex gap-3 rounded bg-gray-500 p-1 px-4 font-medium leading-10 text-white hover:bg-gray-300 hover:text-black"
                >
                  <img
                    src="/assets/images/accelerator/slack-new-logo.svg"
                    height="25px"
                    width="25px"
                    alt=""
                  />{' '}
                  Join us on Slack
                </a>
              </div>
              {courses.map((course, i) => {
                return (
                  <div
                    key={'course_' + (i + 1)}
                    className="mb-5 border-b-2 pt-5 pb-5 text-xl font-bold"
                  >
                    <Accord
                      course={course}
                      content={content}
                      handleClick={handleContent}
                    />
                  </div>
                );
              })}
            </div>
            <div className="order-1 mx-auto max-w-xl flex-grow justify-end pt-14 md:order-2">
              <img
                src="/assets/images/accelerator/cfl-accelerator-logo-blue.png"
                className="mx-auto mb-10 w-[350px]"
                alt=""
              />
              {content?.content && (
                <div
                  className=""
                  dangerouslySetInnerHTML={{ __html: content?.content }}
                ></div>
              )}
              <h2 className="my-5 text-center text-2xl font-bold">
                {content?.title}
              </h2>
              {content?.video && (
                <div
                  className="flex justify-center shadow-[0_35px_60px_-15px_rgba(0,0,0,0.7)]"
                  dangerouslySetInnerHTML={{ __html: content?.video }}
                ></div>
              )}
              {content?.data &&
                content?.data.map((d: any, i: number) => {
                  return (
                    <div key={i}>
                      {d.title && (
                        <div className="m-5 mx-auto mt-5 max-w-xl border-b-2 p-5 text-center text-lg font-medium">
                          {d.title}
                        </div>
                      )}
                      {d.video && (
                        <div
                          className="mb-10 mt-5 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)]"
                          dangerouslySetInnerHTML={{ __html: d.video }}
                        ></div>
                      )}
                    </div>
                  );
                })}
              {content?.afterVideo && (
                <div
                  className="mb-5 mt-5 flex flex-col justify-center"
                  dangerouslySetInnerHTML={{ __html: content?.afterVideo }}
                ></div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Layout
      meta={<Meta title="Course" description="" />}
      header={<Header sticky={true} />}
    >
      {acceleratorCourses()}
    </Layout>
  );
}
