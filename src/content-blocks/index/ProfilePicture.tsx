import profilePictureImg from '../../assets/images/profile_picture.jpg'
import styles from './ProfilePicture.module.css'

export default function ProfilePicture() {
  return (
    <div className={styles.profilePicture}>
      <img
        className={styles.profileImage}
        src={profilePictureImg}
        alt="Nik Brunner's personal website - a black and white photograph of a modernist house representing his digital home"
      />
      <div className={styles.profileImageOverlay}></div>
    </div>
  )
}
