export interface IComponentProps {
  content: any;
}

export default function Component({ content }: IComponentProps) {
  return (
    <div className="space-y-5">
      {content?.map((item: any) => {
        switch (item.__component) {
          case 'course-content.text':
            return (
              <div
                key={item.id}
                className="prose prose-blue"
                dangerouslySetInnerHTML={{ __html: item.Text }}
              />
            );
          case 'course-content.video':
            return (
              <video key={item.id} controls width="250">
                <source src={item.videoUrl} type="video/mp4" />
              </video>
            );
          case 'course-content.embed':
            return (
              <div
                key={item.id}
                className="aspect-w-16 aspect-h-9 rounded-lg"
                dangerouslySetInnerHTML={{ __html: item.embed }}
              ></div>
            );
          default:
            return '';
        }
      })}
    </div>
  );
}
