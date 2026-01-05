import { Globe, Mail, MapPin } from "lucide-react";

interface Props {
  senderName: string;
  senderContact: {
    location: string;
    email: string;
    website: string;
  };
  date: string;
  recipient: string;
  recipientTitle?: string;
  company: string;
}

export function CoverLetterHeader(props: Props) {
  return (
    <header className="CoverLetterHeader">
      <div className="CoverLetterHeader__sender">
        <h1 className="CoverLetterHeader__name">{props.senderName}</h1>
        <div className="CoverLetterHeader__contact">
          <a
            href={`https://www.google.com/maps/search/${encodeURIComponent(props.senderContact.location)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MapPin size={14} />
            {props.senderContact.location}
          </a>
          <a href={`mailto:${props.senderContact.email}`}>
            <Mail size={14} />
            {props.senderContact.email}
          </a>
          <a
            href={props.senderContact.website}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Globe size={14} />
            {props.senderContact.website}
          </a>
        </div>
      </div>

      <div className="CoverLetterHeader__meta">
        <time className="CoverLetterHeader__date">{props.date}</time>
      </div>

      <address className="CoverLetterHeader__recipient">
        <span className="CoverLetterHeader__recipient-name">{props.recipient}</span>
        {props.recipientTitle && (
          <span className="CoverLetterHeader__recipient-title">
            {props.recipientTitle}
          </span>
        )}
        <span className="CoverLetterHeader__recipient-company">{props.company}</span>
      </address>
    </header>
  );
}
