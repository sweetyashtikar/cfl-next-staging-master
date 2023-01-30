// import crypto from 'crypto';

export default function ProfilePicture({
  profile,
  profileURL,
  className,
}: any) {
  const profilePictureUrl = profileURL
    ? profileURL
    : profile?.profilePicture?.url ||
      profile?.legacyProfilePicture ||
      // '/assets/images/noavatar.png';
      '/assets/images/bg.png';

  // gravatar?
  // `https://gravatar.com/avatar/${crypto
  // .createHash('md5')
  // .update(user.email)
  // .digest('hex')}.jpg`

  return (
    <img
      src={profilePictureUrl}
      alt={`Profile picture of ${profile?.firstName} ${profile?.lastName}`}
      className={className}
    />
  );
}
