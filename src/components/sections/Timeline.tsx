import { motion } from 'motion/react';
import ConsoleHeading from '../ui/ConsoleHeading';
import { useLanguage } from '../../i18n/LanguageContext';

interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

export default function Timeline() {
  const { t } = useLanguage();

  return (
    <section id="timeline" className="py-12 md:py-16 bg-brand-surface border-y border-brand-border">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-10 flex flex-col items-center">
          <ConsoleHeading command={t.timeline.command} text={t.timeline.title} className="text-xl sm:text-2xl md:text-4xl font-bold text-brand-primary mb-4" />
          <p className="text-brand-accent max-w-2xl mx-auto">
            {t.timeline.desc}
          </p>
        </div>

        <div className="relative border-l border-brand-border md:border-l-0 md:mx-auto">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-brand-border -translate-x-1/2"></div>
          
          <div className="space-y-12 md:space-y-0 md:space-y-12 md:-my-12">
            {t.timeline.items.map((item: TimelineItem, index: number) => (
              <motion.div 
                key={index} 
                className="relative pl-8 md:pl-0 md:py-12"
                initial={{ opacity: 0, filter: "blur(12px)" }}
                whileInView={{ opacity: 1, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                <div className="absolute left-[-5px] md:left-1/2 top-1 md:top-12 w-2.5 h-2.5 bg-brand-primary rounded-full md:-translate-x-1/2 outline outline-4 outline-brand-surface z-10"></div>
                
                <div className="md:grid md:grid-cols-2 md:gap-8 w-full">
                  <div className={`md:col-span-1 ${index % 2 === 0 ? 'md:col-start-1 md:pr-12' : 'md:col-start-2 md:pl-12'}`}>
                    <span className={`text-sm font-bold text-brand-accent block mb-2 text-left ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>{item.year}</span>
                    <h3 className={`text-xl font-bold text-brand-primary mb-2 text-left ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>{item.title}</h3>
                    <p className={`text-brand-text/80 text-left ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
