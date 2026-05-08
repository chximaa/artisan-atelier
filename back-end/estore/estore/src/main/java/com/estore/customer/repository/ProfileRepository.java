package com.estore.customer.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.estore.customer.entity.Profile;

@Repository
public interface ProfileRepository extends JpaRepository<Profile, Long> {
}