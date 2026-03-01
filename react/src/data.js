export const codeSnippets = [
  {
    id: 1,
    title: "OS 1. FCFS (Without Arrival Time)",
    code: `#include<stdio.h>

int main() {
    int i, n, bt[10], wt[10], tat[10];
    int twt = 0, ttat = 0;
    float awt, atat;

    printf("Enter number of processes: ");
    scanf("%d", &n);

    for(i = 0; i < n; i++) {
        printf("Enter burst time of P%d: ", i+1);
        scanf("%d", &bt[i]);
    }

    wt[0] = 0;
    tat[0] = bt[0];

    for(i = 1; i < n; i++) {
        wt[i] = wt[i-1] + bt[i-1];
        tat[i] = wt[i] + bt[i];
    }

    printf("\\nPID\\tBT\\tWT\\tTAT\\n");

    for(i = 0; i < n; i++) {
        printf("%d\\t%d\\t%d\\t%d\\n", i+1, bt[i], wt[i], tat[i]);
        twt += wt[i];
        ttat += tat[i];
    }

    awt = (float)twt/n;
    atat = (float)ttat/n;

    printf("\\nAverage Waiting Time = %.2f", awt);
    printf("\\nAverage Turnaround Time = %.2f", atat);

    return 0;
}`
  },

  {
    id: 2,
    title: "OS 2. SJF (Without Arrival Time)",
    code: `#include<stdio.h>

int main() {
    int i, j, n, bt[10], wt[10], tat[10], pid[10], temp;
    int twt = 0, ttat = 0;
    float awt, atat;

    printf("Enter number of processes: ");
    scanf("%d", &n);

    for(i = 0; i < n; i++) {
        printf("Enter burst time of P%d: ", i+1);
        scanf("%d", &bt[i]);
        pid[i] = i+1;
    }

    // Sort by burst time
    for(i = 0; i < n-1; i++) {
        for(j = i+1; j < n; j++) {
            if(bt[i] > bt[j]) {
                temp = bt[i]; bt[i] = bt[j]; bt[j] = temp;
                temp = pid[i]; pid[i] = pid[j]; pid[j] = temp;
            }
        }
    }

    wt[0] = 0;
    tat[0] = bt[0];

    for(i = 1; i < n; i++) {
        wt[i] = wt[i-1] + bt[i-1];
        tat[i] = wt[i] + bt[i];
    }

    printf("\\nPID\\tBT\\tWT\\tTAT\\n");

    for(i = 0; i < n; i++) {
        printf("%d\\t%d\\t%d\\t%d\\n", pid[i], bt[i], wt[i], tat[i]);
        twt += wt[i];
        ttat += tat[i];
    }

    awt = (float)twt/n;
    atat = (float)ttat/n;

    printf("\\nAverage Waiting Time = %.2f", awt);
    printf("\\nAverage Turnaround Time = %.2f", atat);

    return 0;
}`
  },

  {
    id: 3,
    title: "OS 3. Priority Scheduling (Without Arrival Time)",
    code: `#include<stdio.h>

int main() {
    int i, j, n, bt[10], pr[10], wt[10], tat[10], pid[10], temp;
    int twt = 0, ttat = 0;
    float awt, atat;

    printf("Enter number of processes: ");
    scanf("%d", &n);

    for(i = 0; i < n; i++) {
        pid[i] = i+1;
        printf("Enter burst time of P%d: ", i+1);
        scanf("%d", &bt[i]);
        printf("Enter priority of P%d: ", i+1);
        scanf("%d", &pr[i]);
    }

    // Sort by priority (lower value = higher priority)
    for(i = 0; i < n-1; i++) {
        for(j = i+1; j < n; j++) {
            if(pr[i] > pr[j]) {
                temp = pr[i]; pr[i] = pr[j]; pr[j] = temp;
                temp = bt[i]; bt[i] = bt[j]; bt[j] = temp;
                temp = pid[i]; pid[i] = pid[j]; pid[j] = temp;
            }
        }
    }

    wt[0] = 0;
    tat[0] = bt[0];

    for(i = 1; i < n; i++) {
        wt[i] = wt[i-1] + bt[i-1];
        tat[i] = wt[i] + bt[i];
    }

    printf("\\nPID\\tPR\\tBT\\tWT\\tTAT\\n");

    for(i = 0; i < n; i++) {
        printf("%d\\t%d\\t%d\\t%d\\t%d\\n", pid[i], pr[i], bt[i], wt[i], tat[i]);
        twt += wt[i];
        ttat += tat[i];
    }

    awt = (float)twt/n;
    atat = (float)ttat/n;

    printf("\\nAverage Waiting Time = %.2f", awt);
    printf("\\nAverage Turnaround Time = %.2f", atat);

    return 0;
}`
  },

  {
    id: 4,
    title: "OS 4. Round Robin",
    code: `#include<stdio.h>

int main() {
    int n, bt[10], rt[10], wt[10], tat[10];
    int i, tq, time = 0, done;
    int twt = 0, ttat = 0;
    float awt, atat;

    printf("Enter number of processes: ");
    scanf("%d", &n);

    for(i = 0; i < n; i++) {
        printf("Enter burst time of P%d: ", i+1);
        scanf("%d", &bt[i]);
        rt[i] = bt[i];
    }

    printf("Enter time quantum: ");
    scanf("%d", &tq);

    do {
        done = 1;
        for(i = 0; i < n; i++) {
            if(rt[i] > 0) {
                done = 0;
                if(rt[i] > tq) {
                    time += tq;
                    rt[i] -= tq;
                } else {
                    time += rt[i];
                    wt[i] = time - bt[i];
                    rt[i] = 0;
                }
            }
        }
    } while(!done);

    printf("\\nPID\\tBT\\tWT\\tTAT\\n");

    for(i = 0; i < n; i++) {
        tat[i] = wt[i] + bt[i];
        twt += wt[i];
        ttat += tat[i];
        printf("%d\\t%d\\t%d\\t%d\\n", i+1, bt[i], wt[i], tat[i]);
    }

    awt = (float)twt/n;
    atat = (float)ttat/n;

    printf("\\nAverage Waiting Time = %.2f", awt);
    printf("\\nAverage Turnaround Time = %.2f", atat);

    return 0;
}`
  },

  {
    id: 5,
    title: "OS 5. FCFS (With Arrival Time)",
    code: `#include<stdio.h>

int main() {
    int n, i, j, bt[10], at[10], wt[10], tat[10], pid[10];
    int time = 0, temp;
    float awt = 0, atat = 0;

    printf("Enter number of processes: ");
    scanf("%d", &n);

    for(i = 0; i < n; i++) {
        pid[i] = i+1;
        printf("Enter burst time of P%d: ", i+1);
        scanf("%d", &bt[i]);
        printf("Enter arrival time of P%d: ", i+1);
        scanf("%d", &at[i]);
    }

    // Sort by arrival time
    for(i = 0; i < n-1; i++) {
        for(j = i+1; j < n; j++) {
            if(at[i] > at[j]) {
                temp = at[i]; at[i] = at[j]; at[j] = temp;
                temp = bt[i]; bt[i] = bt[j]; bt[j] = temp;
                temp = pid[i]; pid[i] = pid[j]; pid[j] = temp;
            }
        }
    }

    printf("\\nPID\\tAT\\tBT\\tWT\\tTAT\\n");

    for(i = 0; i < n; i++) {
        if(time < at[i]) time = at[i];
        wt[i] = time - at[i];
        tat[i] = wt[i] + bt[i];
        time += bt[i];

        awt += wt[i];
        atat += tat[i];

        printf("%d\\t%d\\t%d\\t%d\\t%d\\n", pid[i], at[i], bt[i], wt[i], tat[i]);
    }

    printf("\\nAverage Waiting Time = %.2f", awt/n);
    printf("\\nAverage Turnaround Time = %.2f", atat/n);

    return 0;
}`
  }
];