import ArchiveHeader from '../ArchiveHeader';

export default function ArchiveHeaderExample() {
  return (
    <div>
      <ArchiveHeader 
        showMenuButton={true}
        onMenuToggle={() => console.log('Menu toggled')}
      />
    </div>
  );
}