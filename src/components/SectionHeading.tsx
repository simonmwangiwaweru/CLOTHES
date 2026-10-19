import React from 'react';

interface SectionHeadingProps {
  id?: string;
  title: string;
  description?: string;
  /** Right-aligned slot, e.g. carousel controls. */
  aside?: React.ReactNode;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({ id, title, description, aside }) => (
  <div className="mb-10 flex flex-col justify-between gap-4 sm:mb-12 sm:flex-row sm:items-end">
    <div>
      <h2 id={id} className="heading-section">
        {title}
      </h2>
      {description && <p className="mt-2 max-w-xl text-sm text-muted">{description}</p>}
    </div>
    {aside}
  </div>
);
