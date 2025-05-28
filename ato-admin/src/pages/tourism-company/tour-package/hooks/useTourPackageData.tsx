import { useEffect, useState } from 'react';
import { accommodationService } from '../../../../services/accommodation/accommodation.service';
import { driverService } from '../../../../services/drive/drive.service';
import { tourGuideService } from '../../../../services/tourism-company/tour-guide.service';
import { tourismPackageService } from '../../../../services/tourism-company/tourism-package.service';
import { TourGuideResponse } from '../../../../types/tourism-company/tour-guide.types';
import { TourismPackageResponse } from '../../../../services/tourism-company/tourism-package.service';
import { Accommodation, Driver } from '../type';

export const useTourPackageData = (packageId: string) => {
  const [uploading, setUploading] = useState(false);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const [selectedAccommodation, setSelectedAccommodation] = useState<Accommodation | null>(null);
  const [tourGuides, setTourGuides] = useState<TourGuideResponse[]>([]);
  const [tourPackages, setTourPackages] = useState<TourismPackageResponse[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPackages, setFilteredPackages] = useState<typeof tourPackages>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [driversResponse, accommodationsResponse, tourPackagesResponse, tourGuideResponse] = await Promise.all([
          driverService.getAvailableDrivers(packageId),
          accommodationService.getAccommodations(),
          tourismPackageService.getListTourismPackages(),
          tourGuideService.getTourGuidesAvailable(packageId)
        ]);

        console.log('tourPackagesResponse', tourPackagesResponse.data);
        setDrivers(driversResponse.data);
        setAccommodations(accommodationsResponse.data);
        setTourPackages(tourPackagesResponse.data);
        setFilteredPackages(tourPackagesResponse.data);
        setTourGuides(tourGuideResponse.data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };
    fetchData();
  }, []);

  const filterPackages = (packages: TourismPackageResponse[], term: string) => {
    if (!term) return packages;

    const searchValue = term.toLowerCase();
    return packages.filter(
      (pkg) =>
        pkg.touristFacility?.touristFacilityName?.toLowerCase().includes(searchValue) ||
        pkg.packageName?.toLowerCase().includes(searchValue)
    );
  };

  useEffect(() => {
    setFilteredPackages(filterPackages(tourPackages, searchTerm));
  }, [searchTerm, tourPackages]);

  return {
    uploading,
    setUploading,
    drivers,
    selectedDriver,
    setSelectedDriver,
    accommodations,
    selectedAccommodation,
    setSelectedAccommodation,
    tourGuides,
    tourPackages,
    searchTerm,
    setSearchTerm,
    filteredPackages
  };
};
