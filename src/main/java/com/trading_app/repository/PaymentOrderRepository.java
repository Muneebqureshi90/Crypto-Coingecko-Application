package com.trading_app.repository;

import com.trading_app.entity.PaymentApiIntegra.PaymentOrder;
import org.hibernate.query.criteria.JpaOrder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentOrderRepository extends JpaRepository<PaymentOrder, Long> {

}
