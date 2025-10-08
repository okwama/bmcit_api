-- =========================================
-- Safe, idempotent procedures + indexes
-- Run with mysql CLI or MySQL Workbench
-- =========================================

-- drop procedures if they exist (simple statements)
DROP PROCEDURE IF EXISTS GetPendingRequests;
DROP PROCEDURE IF EXISTS GetInProgressRequests;
DROP PROCEDURE IF EXISTS GetCompletedRequests;
DROP PROCEDURE IF EXISTS GetRequestCounts;
DROP PROCEDURE IF EXISTS GetRequestDetails;
DROP PROCEDURE IF EXISTS UpdateRequestStatus;
DROP PROCEDURE IF EXISTS GetAllStaffRequests;

-- change delimiter so procedure bodies can contain semicolons
DELIMITER $$

CREATE PROCEDURE GetPendingRequests(IN staffId INT)
BEGIN
    SELECT 
        r.id,
        r.pickup_location AS pickupLocation,
        r.delivery_location AS deliveryLocation,
        r.priority,
        r.pickup_date AS pickupDate,
        r.created_at AS createdAt,
        r.my_status AS myStatus,
        st.id AS serviceTypeId,
        st.name AS ServiceType,
        s.id AS staffId,
        s.name AS staffName,
        s.role AS staffRole
    FROM requests r
    LEFT JOIN service_types st ON r.service_type_id = st.id
    LEFT JOIN staff s ON r.staff_id = s.id
    WHERE r.my_status = 1 
      AND r.staff_id = staffId
    ORDER BY r.created_at DESC;
END $$

CREATE PROCEDURE GetInProgressRequests(IN staffId INT)
BEGIN
    SELECT 
        r.id,
        r.pickup_location AS pickupLocation,
        r.delivery_location AS deliveryLocation,
        r.priority,
        r.my_status AS myStatus,
        st.name AS ServiceType,
        b.name AS branchName,
        c.name AS clientName,
        s.id AS staffId,
        s.name AS staffName,
        s.role AS staffRole
    FROM requests r
    LEFT JOIN service_types st ON r.service_type_id = st.id
    LEFT JOIN branches b ON r.branch_id = b.id
    LEFT JOIN clients c ON b.client_id = c.id
    LEFT JOIN staff s ON r.staff_id = s.id
    WHERE r.my_status = 2 
      AND r.staff_id = staffId
    ORDER BY r.created_at DESC;
END $$

CREATE PROCEDURE GetCompletedRequests(IN staffId INT)
BEGIN
    DECLARE today_start DATETIME;
    DECLARE tomorrow_start DATETIME;

    SET today_start = DATE(NOW());
    SET tomorrow_start = DATE_ADD(today_start, INTERVAL 1 DAY);

    SELECT 
        r.id,
        r.pickup_location AS pickupLocation,
        r.delivery_location AS deliveryLocation,
        r.priority,
        r.my_status AS myStatus,
        r.updated_at AS completedAt,
        st.name AS ServiceType,
        b.name AS branchName,
        c.name AS clientName,
        s.id AS staffId,
        s.name AS staffName,
        s.role AS staffRole
    FROM requests r
    LEFT JOIN service_types st ON r.service_type_id = st.id
    LEFT JOIN branches b ON r.branch_id = b.id
    LEFT JOIN clients c ON b.client_id = c.id
    LEFT JOIN staff s ON r.staff_id = s.id
    WHERE r.my_status = 3 
      AND r.staff_id = staffId
      AND r.updated_at >= today_start 
      AND r.updated_at < tomorrow_start
    ORDER BY r.updated_at DESC;
END $$

CREATE PROCEDURE GetRequestCounts(IN staffId INT)
BEGIN
    DECLARE today_start DATETIME;
    DECLARE tomorrow_start DATETIME;

    SET today_start = DATE(NOW());
    SET tomorrow_start = DATE_ADD(today_start, INTERVAL 1 DAY);

    SELECT 
        (SELECT COUNT(*) FROM requests WHERE my_status = 1 AND staff_id = staffId) AS pendingCount,
        (SELECT COUNT(*) FROM requests WHERE my_status = 2 AND staff_id = staffId) AS inProgressCount,
        (SELECT COUNT(*) FROM requests WHERE my_status = 3 AND staff_id = staffId AND updated_at >= today_start AND updated_at < tomorrow_start) AS completedCount;
END $$

CREATE PROCEDURE GetRequestDetails(IN requestId INT, IN staffId INT)
BEGIN
    SELECT 
        r.id,
        r.user_id AS userId,
        r.user_name AS userName,
        r.service_type_id AS serviceTypeId,
        r.price,
        r.pickup_location AS pickupLocation,
        r.delivery_location AS deliveryLocation,
        r.pickup_date AS pickupDate,
        r.description,
        r.priority,
        r.my_status AS myStatus,
        r.status,
        r.created_at AS createdAt,
        r.updated_at AS updatedAt,
        r.staff_id AS staffId,
        r.atm_id AS atmId,
        r.staff_name AS staffName,
        r.team_id AS teamId,
        r.latitude,
        r.longitude,
        r.branch_id AS branchId,
        r.sealNumberId,
        st.name AS serviceTypeName,
        s.role AS staffRole
    FROM requests r
    LEFT JOIN service_types st ON r.service_type_id = st.id
    LEFT JOIN staff s ON r.staff_id = s.id
    WHERE r.id = requestId 
      AND r.staff_id = staffId;
END $$

CREATE PROCEDURE UpdateRequestStatus(IN requestId INT, IN newStatus INT, IN staffId INT)
BEGIN
    DECLARE current_status INT;
    DECLARE affected_rows INT;

    SELECT my_status INTO current_status 
    FROM requests 
    WHERE id = requestId AND staff_id = staffId;

    IF current_status IS NOT NULL THEN
        UPDATE requests 
        SET my_status = newStatus, updated_at = NOW()
        WHERE id = requestId AND staff_id = staffId;

        SET affected_rows = ROW_COUNT();

        SELECT 
            affected_rows AS success,
            current_status AS oldStatus,
            newStatus AS newStatus,
            'Status updated successfully' AS message;
    ELSE
        SELECT 
            0 AS success,
            NULL AS oldStatus,
            NULL AS newStatus,
            'Request not found or unauthorized' AS message;
    END IF;
END $$

CREATE PROCEDURE GetAllStaffRequests(IN requesterRole VARCHAR(50))
BEGIN
    IF requesterRole IN ('SUPERVISOR', 'ADMIN') THEN
        SELECT 
            r.id,
            r.pickup_location AS pickupLocation,
            r.delivery_location AS deliveryLocation,
            r.my_status AS myStatus,
            st.name AS serviceTypeName,
            s.name AS staffName,
            s.role AS staffRole,
            r.created_at AS createdAt
        FROM requests r
        LEFT JOIN service_types st ON r.service_type_id = st.id
        LEFT JOIN staff s ON r.staff_id = s.id
        ORDER BY r.created_at DESC;
    ELSE
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Not authorized to view all requests';
    END IF;
END $$

-- restore default delimiter
DELIMITER ;

-- Index handling (safe)
-- If your server supports IF EXISTS for DROP INDEX use that; otherwise run SHOW INDEX first.
DROP INDEX IF EXISTS idx_requests_pending ON requests;
DROP INDEX IF EXISTS idx_requests_in_progress ON requests;
DROP INDEX IF EXISTS idx_requests_completed ON requests;
DROP INDEX IF EXISTS idx_requests_id_staff ON requests;
DROP INDEX IF EXISTS idx_requests_status_update ON requests;
DROP INDEX IF EXISTS idx_requests_staff_status ON requests;
DROP INDEX IF EXISTS idx_requests_created_at ON requests;
DROP INDEX IF EXISTS idx_requests_updated_at ON requests;

CREATE INDEX idx_requests_pending        ON requests(my_status, staff_id);
CREATE INDEX idx_requests_in_progress   ON requests(my_status, staff_id);
CREATE INDEX idx_requests_completed     ON requests(my_status, staff_id, updated_at);
CREATE INDEX idx_requests_id_staff      ON requests(id, staff_id);
CREATE INDEX idx_requests_status_update ON requests(id, staff_id, my_status, updated_at);
CREATE INDEX idx_requests_staff_status  ON requests(staff_id, my_status);
CREATE INDEX idx_requests_created_at    ON requests(created_at);
CREATE INDEX idx_requests_updated_at    ON requests(updated_at);
