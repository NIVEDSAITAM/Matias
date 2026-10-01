import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";

import styles from "./src/styles/Styles";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello!!</Text>
            <Text style={styles.name}>Devin Matias</Text>
          </View>

          <TouchableOpacity style={styles.profileButton}>
            <Text style={styles.profileText}>DM</Text>
          </TouchableOpacity>
        </View>

        {/* Balance */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Total Balance</Text>
          <Text style={styles.balanceAmount}>₱24,580.00</Text>

          <View style={styles.balanceFooter}>
            <View>
              <Text style={styles.smallLabel}>This month</Text>
              <Text style={styles.income}>+₱4,250.00</Text>
            </View>

            <View style={styles.percentageBox}>
              <Text style={styles.percentage}>+12.8%</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>

        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.actionCard}>
            <View style={[styles.actionIcon, styles.blueIcon]}>
              <Text style={styles.iconText}>＋</Text>
            </View>
            <Text style={styles.actionText}>Add Money</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard}>
            <View style={[styles.actionIcon, styles.purpleIcon]}>
              <Text style={styles.iconText}>↗</Text>
            </View>
            <Text style={styles.actionText}>Send</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard}>
            <View style={[styles.actionIcon, styles.orangeIcon]}>
              <Text style={styles.iconText}>▣</Text>
            </View>
            <Text style={styles.actionText}>Bills</Text>
          </TouchableOpacity>
        </View>

        {/* Spending Overview */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Spending Overview</Text>
          <Text style={styles.viewText}>This Month</Text>
        </View>

        <View style={styles.chartCard}>
          <View style={styles.chartHeader}>
            <View>
              <Text style={styles.chartLabel}>Total spending</Text>
              <Text style={styles.chartAmount}>₱8,420</Text>
            </View>

            <Text style={styles.chartChange}>↓ 8.4%</Text>
          </View>

          <View style={styles.chart}>
            <View style={styles.gridLine} />
            <View style={[styles.gridLine, { top: 35 }]} />
            <View style={[styles.gridLine, { top: 70 }]} />

            <View style={styles.barContainer}>
              <View style={[styles.bar, { height: 45 }]} />
              <View style={[styles.bar, { height: 65 }]} />
              <View style={[styles.bar, { height: 50 }]} />
              <View style={[styles.bar, { height: 90 }]} />
              <View style={[styles.bar, { height: 72 }]} />
              <View style={[styles.bar, { height: 105 }]} />
              <View
                style={[styles.bar, styles.activeBar, { height: 125 }]}
              />
            </View>
          </View>

          <View style={styles.days}>
            <Text style={styles.day}>Mon</Text>
            <Text style={styles.day}>Tue</Text>
            <Text style={styles.day}>Wed</Text>
            <Text style={styles.day}>Thu</Text>
            <Text style={styles.day}>Fri</Text>
            <Text style={styles.day}>Sat</Text>
            <Text style={styles.day}>Sun</Text>
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <Text style={styles.viewText}>See all</Text>
        </View>

        <View style={styles.activityCard}>
          <ActivityItem
            icon="🛒"
            title="Grocery Shopping"
            subtitle="Today • 10:32 AM"
            amount="-₱1,250"
          />

          <ActivityItem
            icon="☕"
            title="Coffee Shop"
            subtitle="Yesterday • 3:15 PM"
            amount="-₱185"
          />

          <ActivityItem
            icon="💰"
            title="Salary Deposit"
            subtitle="Sep 25 • 9:00 AM"
            amount="+₱18,500"
            positive
          />
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.activeNavIcon}>⌂</Text>
          <Text style={styles.activeNavText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>◷</Text>
          <Text style={styles.navText}>Activity</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>▥</Text>
          <Text style={styles.navText}>Budget</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>⚙</Text>
          <Text style={styles.navText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function ActivityItem({ icon, title, subtitle, amount, positive }) {
  return (
    <View style={styles.activityItem}>
      <View style={styles.activityLeft}>
        <View style={styles.activityIcon}>
          <Text style={styles.emoji}>{icon}</Text>
        </View>

        <View>
          <Text style={styles.activityTitle}>{title}</Text>
          <Text style={styles.activitySubtitle}>{subtitle}</Text>
        </View>
      </View>

      <Text
        style={[
          styles.activityAmount,
          positive && styles.positiveAmount,
        ]}
      >
        {amount}
      </Text>
    </View>
  );
}