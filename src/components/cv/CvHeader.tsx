import { Github, Globe, Linkedin, Mail, MapPin } from "lucide-react";

interface Props {
  name: string;
  tagline: string;
  summary: string;
  img: string;
  contact: {
    location: string;
    website: string;
    email: string;
    github: string;
    linkedin: string;
  };
}

export function CvHeader(props: Props) {
  return (
    <header className="CvHeader">
      <div className="CvHeader__texts">
        <h1 className="CvHeader__name">{props.name}</h1>
        <p className="CvHeader__tagline"> {props.tagline} </p>
        <p className="CvHeader__summary">{props.summary}</p>

        <div className="CvHeader__contact">
          <span>
            <MapPin size={14} />
            {props.contact.location}
          </span>
          <span>
            <Globe size={14} />
            {props.contact.website}
          </span>
          <span>
            <Mail size={14} />
            {props.contact.email}
          </span>
          <span>
            <Github size={14} />
            {props.contact.github}
          </span>
          <span>
            <Linkedin size={14} />
            {props.contact.linkedin}
          </span>
        </div>
      </div>

      <div className="CvHeader__aside">
        <img className="CvHeader__photo" src={props.img} alt="Nikolaus Brunner" />
      </div>
    </header>
  );
}
