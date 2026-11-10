import ProjectsManager from '@/components/admin/ProjectsManager';

export default function AdminLogoPortfolioPage() {
  return (
    <ProjectsManager
      fixedCategory='Logo Design'
      title='Logo Portfolio'
      description='Shown on the Logo Design service page.'
      folder='logo-portfolio'
      showLinks={false}
    />
  );
}
