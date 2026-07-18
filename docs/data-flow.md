# Data Flows

Flows publish business facts after their transaction succeeds. Delivery is at-least-once, so consumers must be idempotent. Correlation IDs connect work across synchronous and asynchronous boundaries.

## Study Session Flow

```mermaid
sequenceDiagram
    actor U as User
    participant F as Frontend
    participant G as API Gateway
    participant L as Learning Engine
    participant M as Memory Engine
    participant A as Analytics
    U->>F: Start and complete study session
    F->>G: Submit session activity
    G->>L: Authorised command
    L->>L: Validate and persist session
    L-->>M: SessionCompleted event
    L-->>A: SessionCompleted event
    M->>M: Update memory candidates
    A->>A: Update progress aggregates
    G-->>F: Session summary
```
## Revision Flow

```mermaid
sequenceDiagram
    actor U as User
    participant P as Planner
    participant M as Memory Engine
    participant K as Knowledge Graph
    participant N as Notification Service
    U->>P: Request or accept revision plan
    P->>M: Query retention and weak-area signals
    P->>K: Query prerequisites and topic scope
    P->>P: Create revision commitments
    P-->>N: RevisionScheduled event
    N-->>U: Deliver reminder per preferences
    U->>P: Mark revision complete
    P-->>M: RevisionCompleted event
```

## Memory Update Flow

```mermaid
sequenceDiagram
    participant D as Domain Module
    participant M as Memory Engine
    participant V as Vector Retrieval
    participant DB as Database
    participant U as User
    D-->>M: LearnerFactObserved event
    M->>M: Apply policy, provenance, confidence
    M->>DB: Store record and audit trail
    M->>V: Create or update eligible embedding
    U->>M: Correct or delete memory
    M->>DB: Supersede or erase record
    M->>V: Remove or refresh vector
```

## Quiz Generation Flow

```mermaid
sequenceDiagram
    actor U as User
    participant E as Examiner
    participant K as Knowledge Graph
    participant R as Retrieval
    participant AI as AI Orchestration
    U->>E: Request quiz for topic and level
    E->>K: Resolve allowed concept scope
    E->>R: Retrieve grounded source context
    E->>AI: Generate items with schema and context
    AI-->>E: Candidate quiz
    E->>E: Validate schema, scope, and answer keys
    E-->>U: Deliver quiz
    U->>E: Submit attempt
    E-->>E: Score and publish AssessmentCompleted
```

## Analytics Flow

```mermaid
sequenceDiagram
    participant D as Domain Modules
    participant A as Analytics
    participant DB as Analytics Read Model
    participant P as Planner
    D-->>A: Session, plan, and assessment events
    A->>A: Deduplicate and validate
    A->>DB: Update aggregates and trends
    A-->>P: PerformanceSignal event
    P->>P: Re-evaluate plan when policy permits
```

## Notification Flow

```mermaid
sequenceDiagram
    participant D as Domain Module
    participant N as Notification Service
    participant A as Authentication
    participant X as Delivery Provider
    actor U as User
    D-->>N: NotificationRequested event
    N->>A: Resolve identity and preferences
    N->>N: Apply consent, quiet hours, deduplication
    N->>X: Send scheduled message
    X-->>N: Delivery status
    N-->>U: In-app, push, email, or SMS notification
    N-->>D: NotificationDelivered or NotificationFailed
```
