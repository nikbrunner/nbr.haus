import profilePictureImg from "../../assets/images/profile_picture.jpg";

export default function ProfilePicture() {
  return (
    <div className="profile-picture">
      <img
        className="profile-picture__image"
        src={profilePictureImg}
        alt="Nik Brunner's personal website - a black and white photograph of a modernist house representing his digital home"
      />
      <div className="profile-picture__overlay"></div>
    </div>
  );
}
