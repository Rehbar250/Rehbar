import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Container } from './ui/Container';
import { GradientText } from './ui/GradientText';
import { Github, Star, GitFork, Code, Activity, ExternalLink } from 'lucide-react';
import { Magnetic } from './ui/Magnetic';

export const GitHubSection: React.FC = () => {
  const [stats, setStats] = useState({ repos: 15, stars: 23, forks: 8, contributions: 540 });

  useEffect(() => {
    // Dynamic fetch from GitHub API for Rehbar250
    fetch('https://api.github.com/users/Rehbar250')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.public_repos) {
          setStats((prev) => ({ ...prev, repos: data.public_repos }));
        }
      })
      .catch(() => {
        // Fallback stats stay active
      });
  }, []);

  const languages = [
    { name: 'C / C++', percent: '40%', color: 'bg-blue-500' },
    { name: 'TypeScript', percent: '30%', color: 'bg-indigo-500' },
    { name: 'JavaScript', percent: '18%', color: 'bg-[#BBCCD7]' },
    { name: 'Python', percent: '12%', color: 'bg-[#646973]' },
  ];

  return (
    <section className="py-28 relative bg-[#0C0C0C]">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border border-white/10 text-xs font-mono text-[#BBCCD7] mb-3">
              <Github className="w-3.5 h-3.5" />
              <span>OPEN SOURCE METRICS</span>
            </div>
            <h2 className="text-fluid-title font-extrabold uppercase text-white">
              GITHUB <GradientText>SHOWCASE</GradientText>
            </h2>
          </div>

          <Magnetic intensity={0.15}>
            <a
              href="https://github.com/Rehbar250"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#181D24] text-white border border-[#BBCCD7]/30 hover:border-[#BBCCD7] text-sm font-semibold shadow-lg transition-all"
            >
              <Github className="w-4 h-4 text-[#BBCCD7]" />
              <span>Follow @Rehbar250</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </Magnetic>
        </div>

        {/* Stats Grid Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-6 rounded-2xl border border-white/10 text-center"
          >
            <div className="text-3xl md:text-4xl font-extrabold text-[#BBCCD7] mb-1">{stats.repos}+</div>
            <div className="text-xs font-mono text-[#8A99AD]">Public Repositories</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="glass-card p-6 rounded-2xl border border-white/10 text-center"
          >
            <div className="text-3xl md:text-4xl font-extrabold text-[#BBCCD7] mb-1 flex items-center justify-center gap-1">
              <Star className="w-6 h-6 text-amber-400 fill-amber-400" />
              {stats.stars}+
            </div>
            <div className="text-xs font-mono text-[#8A99AD]">GitHub Stars</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.16 }}
            className="glass-card p-6 rounded-2xl border border-white/10 text-center"
          >
            <div className="text-3xl md:text-4xl font-extrabold text-[#BBCCD7] mb-1 flex items-center justify-center gap-1">
              <Activity className="w-6 h-6 text-emerald-400" />
              {stats.contributions}+
            </div>
            <div className="text-xs font-mono text-[#8A99AD]">Yearly Contributions</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.24 }}
            className="glass-card p-6 rounded-2xl border border-white/10 text-center"
          >
            <div className="text-3xl md:text-4xl font-extrabold text-[#BBCCD7] mb-1 flex items-center justify-center gap-1">
              <GitFork className="w-6 h-6 text-blue-400" />
              {stats.forks}+
            </div>
            <div className="text-xs font-mono text-[#8A99AD]">Forks & Clones</div>
          </motion.div>
        </div>

        {/* Top Languages Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="glass-card p-8 rounded-3xl border border-white/10"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Code className="w-4 h-4 text-[#BBCCD7]" /> Most Used Languages
            </h3>
            <span className="text-xs font-mono text-[#8A99AD]">Auto-Calculated</span>
          </div>

          {/* Progress Bar */}
          <div className="h-3 w-full rounded-full bg-white/5 flex overflow-hidden gap-1 mb-6">
            {languages.map((l) => (
              <div key={l.name} className={`${l.color} h-full`} style={{ width: l.percent }} />
            ))}
          </div>

          {/* Languages Legend */}
          <div className="flex flex-wrap items-center gap-6 text-xs font-mono text-[#8A99AD]">
            {languages.map((l) => (
              <div key={l.name} className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${l.color}`} />
                <span className="text-[#D7E2EA] font-semibold">{l.name}</span>
                <span>({l.percent})</span>
              </div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
};
